import React from 'react';
import { render } from '@testing-library/react';
import BoxGroup from '.';

describe('render properly', () => {
  test('render correct', () => {
    const title = 'cnn';
    const { getAllByText, rerender } = render(
      <BoxGroup title={title} linkIconUrl="cdn" anchorId="hello">
        <h1>hello</h1>
        <h1>hello</h1>
      </BoxGroup>
    );
    rerender(
      <BoxGroup title={title} linkIconUrl="cdn" anchorId="hello" isWebsite>
        <h1>hello</h1>
        <h1>hello</h1>
      </BoxGroup>
    );
    expect(getAllByText(title)).toHaveLength(1);
  });
});
