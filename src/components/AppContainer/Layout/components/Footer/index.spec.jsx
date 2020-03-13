import React from 'react';
import { render } from '@testing-library/react';
import Footer from '.';

describe('render properly', () => {
  test('render correct', () => {
    const authorName = 'hello';
    const { getByText, rerender } = render(
      <Footer author={authorName} year={1998} hideAuthor />
    );
    rerender(<Footer author={authorName} year={1998} />);
    expect(getByText(authorName)).toBeTruthy();
  });
});
