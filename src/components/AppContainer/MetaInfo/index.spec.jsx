import React from 'react';
import { render } from '@testing-library/react';
import MetaInfo from '.';

describe('render properly', () => {
  test('render correct', () => {
    const { container } = render(
      <MetaInfo author="hello" lastBuildDate="2020-02-19" />
    );
    expect(container.querySelectorAll('meta')).toHaveLength(27);
  });
});
