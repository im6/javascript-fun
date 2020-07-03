import React from 'react';
import { render } from '@testing-library/react';
import GithubCorner from '.';

describe('render properly', () => {
  test('render correct', () => {
    const url = 'www.github.com';
    const { queryAllByTitle } = render(<GithubCorner url={url} />);
    expect(queryAllByTitle('View source code')).toHaveLength(2);
  });
});
