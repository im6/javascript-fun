import { render } from '@testing-library/react';
import GitPage from './index';

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
      {
        id: '2',
        name: 'grp2',
        anchorId: 'hello2',
        list: [],
      },
    ];
    const { getByText, rerender } = render(
      <GitPage
        nonLazyImgIndex={-1}
        githubUrl="github.com"
        iconCdnUrl="aws.com"
        source={src}
        adSenseClient="abc"
        adSenseUnits={['1', '2', '3']}
        adPositions={[0]}
      />
    );
    rerender(
      <GitPage
        nonLazyImgIndex={1}
        githubUrl="github.com"
        iconCdnUrl="aws.com"
        source={src}
        adSenseClient="abc"
        adSenseUnits={['1', '2', '3']}
        adPositions={[0]}
      />
    );

    expect(getByText(src[0].name)).toBeTruthy();
  });
});
