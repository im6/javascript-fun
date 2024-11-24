require('dotenv').config({ path: '../../../javascript-fun.env' });

const prompts = require('prompts');
import { GitSchema, SiteSchema } from './interface';
import {
  putNewEntry,
  validateGithubUrl,
  validateWebUrl,
  validateCategoryName,
} from './promise';

const githubUrlFormat = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9-.]+$/;
const webUrlFormat = /^https?:/;
const cateCache = new Map();

const getTableSelection = () =>
  prompts({
    type: 'select',
    name: 'table',
    message: 'Which table to add?',
    choices: [
      { title: 'git', description: 'GitHub', value: 'git' },
      { title: 'site', description: 'Site', value: 'site' },
      // { title: 'category', description: 'Category', value: 'category' },
    ],
  });

const getGitPrompts = () =>
  prompts([
    {
      type: 'text',
      name: 'github',
      message: 'What is the Github subUrl?',
      validate: async (value) => {
        if (!githubUrlFormat.test(value)) {
          return 'incorrect format';
        }

        const existed = await validateGithubUrl(value);
        if (existed) {
          return 'Url exist';
        }
        return true;
      },
    },
    {
      type: 'text',
      name: 'group',
      message: 'What is the group name?',
      validate: async (value) => {
        const matches: any = await validateCategoryName(value);
        if (matches.length === 0) {
          return 'Category name not found';
        }
        const { id, name } = matches[0];
        cateCache.set(name, id);
        return true;
      },
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: (prev) =>
        `Can you confirm group Id: ${cateCache.get(prev)}, name: ${prev}?`,
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
  ]);

const getSitePrompts = () =>
  prompts([
    {
      type: 'text',
      name: 'url',
      message: 'What is the web link?',
      validate: async (value) => {
        if (!webUrlFormat.test(value)) {
          return 'incorrect format';
        }

        const existed = await validateWebUrl(value);
        if (existed) {
          return 'Url exist';
        }
        return true;
      },
    },
    {
      type: 'text',
      name: 'group',
      message: 'What is the group name?',
      validate: async (value) => {
        const matches: any = await validateCategoryName(value);
        if (matches.length === 0) {
          return 'Category name not found';
        }
        const { id, name } = matches[0];
        cateCache.set(name, id);
        return true;
      },
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: (prev) =>
        `Can you confirm group Id: ${cateCache.get(prev)}, name: ${prev}?`,
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
  ]);

const app = async () => {
  const { table } = await getTableSelection();
  if (table === 'git') {
    const a = await getGitPrompts();
    if (!a.confirm || !a.group || typeof a.img !== 'string') {
      console.log('canceled'); // eslint-disable-line no-console
      return;
    }
    const category = cateCache.get(a.group);
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
    putNewEntry('jsfun_git', item).then((res) => {
      console.log('Add to git table successfully.', res); // eslint-disable-line no-console
    });
  } else if (table === 'site') {
    const a = await getSitePrompts();
    const category = cateCache.get(a.group);
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
    putNewEntry('jsfun_site', item).then((res) => {
      console.log('Add to site table successfully.', res); // eslint-disable-line no-console
    });
  }
};

app();
