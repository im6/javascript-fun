import React from 'react';
import { render } from '@testing-library/react';
import TopNav from '.';

describe('render properly', () => {
  test('render correct', () => {
    const url = 'www.github.com';
    const { getByRole } = render(
      <TopNav
        url={url}
        topNavConfig={[
          {
            to: '/',
            img: 'vue.png',
            title: 'Front End Framework',
            alt: 'framework',
          },
        ]}
        iconCdnUrl="www.cdn.com"
      />
    );
    expect(getByRole('group')).toBeTruthy();
  });
});
