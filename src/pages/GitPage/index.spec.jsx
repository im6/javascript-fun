import React from 'react';
import { render } from '@testing-library/react';
import GitPage from '.';

describe('render properly', () => {
  test('render correct', () => {
    const src = [
      {
        id: '1',
        name: 'grp1',
        anchorId: 'hello',
        list: [
          {
            name: 'vue',
            github: '/vue',
            desc: 'vue desc',
            img: 'vue.svg',
            imgSrc: '/',
            star: 39,
          },
          {
            name: 'react',
            github: '/react',
            desc: 'vue desc',
            imgSrc: '/',
            star: 41,
          },
        ],
      },
    ];
    const { getByText, rerender } = render(
      <GitPage
        nonLazyImgIndex={-1}
        githubUrl="github.com"
        iconCdnUrl="aws.com"
        defaultIcon="default.img"
        source={src}
      />
    );
    rerender(
      <GitPage
        nonLazyImgIndex={1}
        githubUrl="github.com"
        iconCdnUrl="aws.com"
        defaultIcon="default.img"
        source={src}
      />
    );

    expect(getByText(src[0].name)).toBeTruthy();
  });
});
