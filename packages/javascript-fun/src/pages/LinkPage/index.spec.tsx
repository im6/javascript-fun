import { render } from '@testing-library/react';
import LinkPage from '.';

describe('render properly', () => {
  test('render correct', () => {
    const src = [
      {
        id: 1,
        name: 'grp1',
        anchorId: 'hello',
        list: [
          {
            name: 'vue',
            url: '/vue',
            desc: 'vue desc',
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
    const { getByText } = render(
      <LinkPage
        source={src}
        iconCdnUrl="cdn"
        adSenseClient="abc"
        adSenseUnits={['1', '2', '3']}
        adPositions={[0]}
      />
    );
    expect(getByText(src[0].name)).toBeTruthy();
  });
});
