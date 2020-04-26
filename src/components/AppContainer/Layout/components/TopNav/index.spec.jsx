import React from 'react';
import { render } from '@testing-library/react';
import TopNav from '.';

const topNavConfig = [
  {
    to: '/',
    img: 'vue.png',
    title: 'Front End Framework',
    alt: 'framework',
    asset: 'main',
  },
  {
    to: '/node/',
    img: 'mongo.png',
    title: 'Node.js Framework',
    alt: 'node',
    asset: 'main',
  },
  {
    to: '/library/',
    img: 'bower.png',
    title: 'JS Library',
    alt: 'library',
    asset: 'main',
  },
  {
    to: '/site/',
    img: 'site.png',
    title: 'Website',
    alt: 'site',
    asset: 'site',
  },
  {
    to: 'https://github.com/im6/javascript-fun/issues/5',
    img: 'fa-plus-wht.svg',
    title: 'Submit Github Link',
    alt: 'add',
  },
];

describe('render properly', () => {
  test('render correct', () => {
    const url = 'www.github.com';
    const { getByRole, rerender } = render(
      <TopNav
        url={url}
        topNavConfig={topNavConfig.filter((v) => v.alt !== 'add')}
        iconCdnUrl="www.cdn.com"
      />
    );
    rerender(
      <TopNav url={url} topNavConfig={topNavConfig} iconCdnUrl="www.cdn.com" />
    );
    expect(getByRole('group')).toBeTruthy();
  });
});
