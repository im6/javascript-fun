import React from 'react';
import { render } from '@testing-library/react';
import MetaInfo from '.';

describe('render properly', () => {
  test('render correct', () => {
    const { container } = render(<MetaInfo author="hello" />);
    expect(container.querySelectorAll('meta')).toHaveLength(8);
  });
});
