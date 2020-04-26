import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from '.';

describe('render properly', () => {
  test('render correct', () => {
    const word = 'hello';
    const { getByText } = render(<Sidebar defaultType={word} />);
    expect(getByText(word)).toBeTruthy();
  });
});
