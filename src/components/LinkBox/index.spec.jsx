import React from 'react';
import { render } from '@testing-library/react';
import LinkBox from '.';

describe('render properly', () => {
  test('render correct', () => {
    const name = 'cnn';
    const { getAllByText } = render(
      <LinkBox url="//www.cnn.com" name="cnn" desc="news" />
    );
    expect(getAllByText(name)).toHaveLength(1);
  });
});
