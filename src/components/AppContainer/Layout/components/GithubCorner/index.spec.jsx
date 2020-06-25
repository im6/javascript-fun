import React from 'react';
import { render } from '@testing-library/react';
import GithubCorner from '.';

describe('render properly', () => {
  test('render correct', () => {
    const url = 'www.github.com';
    const { getByTitle } = render(<GithubCorner url={url} />);
    expect(getByTitle('View source code')).toBeTruthy();
  });
});
