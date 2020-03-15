import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from '.';

describe('render properly', () => {
  test('render correct', () => {
    const words = ['hello', 'world'];
    const { getByText } = render(<Sidebar words={words} />);
    expect(getByText(words[0])).toBeTruthy();
  });
});
