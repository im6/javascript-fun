require('dotenv').config({ path: '../../../javascript-fun.env' });

const prompts = require('prompts');
import { getDynamoPut$, dynamoScanGitAndCategory$ } from './observables';
import { CategorySchema, GitSchema, SiteSchema } from './interface';

const githubUrlFormat = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9-.]+$/;

const generatePrompts = (result) => {
  const git: GitSchema[] = result[0];
  const cate: CategorySchema[] = result[1];
  const gitMap = git.reduce((acc, cur) => {
    acc[cur.github.toLowerCase()] = true;
    return acc;
  }, {});
  const cateMap = cate.reduce((acc, cur) => {
    acc[cur.name.toLowerCase()] = cur.id;
    return acc;
  }, {});

  prompts({
    type: 'select',
    name: 'table',
    message: 'Which table to add?',
    choices: [
      { title: 'git', description: 'GitHub', value: 'git' },
      { title: 'site', description: 'Site', value: 'site' },
      // { title: 'category', description: 'Category', value: 'category' },
    ],
  }).then(({ table }) => {
    switch (table) {
      case 'git':
        prompts([
          {
            type: 'text',
            name: 'github',
            message: 'What is the Github subUrl?',
            validate: (value) => {
              if (value.toLowerCase() in gitMap) return 'Url exist';
              if (!githubUrlFormat.test(value)) return 'incorrect format';
              return true;
            },
          },
          {
            type: 'text',
            name: 'group',
            message: 'What is the group name?',
            validate: (value) => {
              if (value.toLowerCase() in cateMap === false)
                return 'Group name not exist';
              return true;
            },
          },
          {
            type: 'confirm',
            name: 'confirm',
            message: (prev) =>
              `Can you confirm group Id: ${
                cateMap[prev.toLowerCase()]
              }, name: ${prev.toLowerCase()}?`,
            initial: true,
          },
          {
            type: 'text',
            name: 'name',
            message: 'Do you have optinal name?',
          },
          {
            type: 'text',
            name: 'img',
            message: 'Do you have optinal icon file?',
          },
        ]).then((a) => {
          if (!a.confirm || !a.group) {
            console.log('canceled'); // eslint-disable-line no-console
            return;
          }
          const category = cateMap[a.group.toLowerCase()];
          const item: GitSchema = {
            category,
            github: a.github,
          };
          if (a.img) {
            item.img = a.img;
          }
          if (a.name) {
            item.name = a.name;
          }
          console.log(item); // eslint-disable-line no-console
          getDynamoPut$('jsfun_git', item).subscribe((res) => {
            console.log('Add to git table successfully.', res); // eslint-disable-line no-console
          });
        });
        break;
      case 'site':
        prompts([
          {
            type: 'text',
            name: 'url',
            message: 'What is the web link?',
          },
          {
            type: 'text',
            name: 'group',
            message: 'What is the group name?',
            validate: (value) => {
              if (value.toLowerCase() in cateMap === false)
                return 'Group name not exist';
              return true;
            },
          },
          {
            type: 'confirm',
            name: 'confirm',
            message: (prev) =>
              `Can you confirm group Id: ${
                cateMap[prev.toLowerCase()]
              }, name: ${prev.toLowerCase()}?`,
            initial: true,
          },
          {
            type: 'text',
            name: 'name',
            validate: (value) => {
              if (!value) return 'You have to set a name';
              return true;
            },
            message: 'What is website name?',
          },
          {
            type: 'text',
            name: 'desc',
            message: 'Do you have optinal description?',
          },
        ]).then((a) => {
          const category = cateMap[a.group.toLowerCase()];
          if (!a.confirm || !category) {
            console.log('canceled'); // eslint-disable-line no-console
            return;
          }
          const item: SiteSchema = {
            category,
            url: a.url,
            name: a.name,
          };
          if (a.desc) {
            item.desc = a.desc;
          }
          console.log(item); // eslint-disable-line no-console
          getDynamoPut$('jsfun_site', item).subscribe((res) => {
            console.log('Add to site table successfully.', res); // eslint-disable-line no-console
          });
        });
        break;
      default:
        break;
    }
  });
};

dynamoScanGitAndCategory$.subscribe({
  next: (twoTableRows) => {
    generatePrompts(twoTableRows);
  },
  error: (err) => {
    console.error(err); // eslint-disable-line no-console
  },
});
