import React from 'react';
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
    ];
    const { getByText } = render(<LinkPage source={src} iconCdnUrl="cdn" />);
    expect(getByText(src[0].name)).toBeTruthy();
  });
});
