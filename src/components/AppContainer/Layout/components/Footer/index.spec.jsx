import React from 'react';
import { render } from '@testing-library/react';
import Footer from '.';

describe('render properly', () => {
  test('render correct', () => {
    const authorName = 'hello';
    const pageSpeedUrl = 'www.cnn.com';
    const { getByText, rerender } = render(
      <Footer
        author={authorName}
        year={1998}
        hideAuthor
        pageSpeedUrl={pageSpeedUrl}
      />
    );
    rerender(
      <Footer author={authorName} year={1998} pageSpeedUrl={pageSpeedUrl} />
    );
    expect(getByText(authorName)).toBeTruthy();
  });
});
