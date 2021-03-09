import async from 'async';
import prompts from 'prompts';
import sqlExecOne from '../db';

async.parallel(
  [
    (cb) => {
      sqlExecOne('SELECT * FROM git', cb);
    },
    (cb) => {
      sqlExecOne('SELECT * FROM category_git', cb);
    },
  ],
  (err, [git, cate]) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      return;
    }
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
        { title: 'category', description: 'Category', value: 'category_git' },
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
              name: 'groupId',
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
            if (!a.confirm) {
              console.log('canceled'); // eslint-disable-line no-console
              return;
            }
            const img = a.img ? `"${a.img}"` : 'NULL';
            const name = a.name ? `"${a.name}"` : 'NULL';
            const query = `INSERT INTO git (github, grp, name, img) VALUES ("${
              a.github
            }", ${cateMap[a.group.toLowerCase()]}, ${name}, ${img});`;
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
            if (!a.confirm) {
              console.log('canceled'); // eslint-disable-line no-console
              return;
            }
            const query = `INSERT INTO site (url, grp, name) VALUES ("${
              a.url
            }", ${cateMap[a.group.toLowerCase()]}, "${a.name}");`;
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
  }
);
