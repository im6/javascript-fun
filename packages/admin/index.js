const { zip } = require('rxjs');
const prompts = require('prompts');
const mysqlObservable = require('mysql-observable');

const githubUrlFormat = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9-.]+$/;

const sqlRes = zip(
  mysqlObservable('SELECT * FROM git'),
  mysqlObservable('SELECT * FROM category')
);

const generatePrompts = ([git, cate]) => {
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
          const grpId = cateMap[a.group.toLowerCase()];
          if (!a.confirm || !grpId) {
            console.log('canceled'); // eslint-disable-line no-console
            return;
          }
          const img = a.img ? `"${a.img}"` : 'NULL';
          const name = a.name ? `"${a.name}"` : 'NULL';
          const query = `INSERT INTO git (github, grp, name, img) VALUES ("${a.github}", ${grpId}, ${name}, ${img});`;
          console.log(query); // eslint-disable-line no-console
          sqlExecOne(query, (err1) => {
            if (err1) {
              console.error(err1); // eslint-disable-line no-console
              return;
            }
            console.log('Add to git table successfully.'); // eslint-disable-line no-console
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
        ]).then((a) => {
          const grpId = cateMap[a.group.toLowerCase()];
          if (!a.confirm || !grpId) {
            console.log('canceled'); // eslint-disable-line no-console
            return;
          }
          const query = `INSERT INTO site (url, grp, name) VALUES ("${a.url}", ${grpId}, "${a.name}");`;
          console.log(query); // eslint-disable-line no-console
          sqlExecOne(query, (err1) => {
            if (err1) {
              console.error(err1); // eslint-disable-line no-console
              return;
            }
            console.log('Add to site table successfully.'); // eslint-disable-line no-console
          });
        });
        break;
      default:
        break;
    }
  });
};

sqlRes.subscribe({
  next: (twoTableRows) => {
    generatePrompts(twoTableRows);
  },
  error: (err) => {
    console.error(err);
  },
});
