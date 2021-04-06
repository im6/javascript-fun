import { render } from '@testing-library/react';
import MetaInfo from '.';

describe('render properly', () => {
  test('render correct', () => {
    const { container } = render(
      <MetaInfo author="hello" year="2020" domain="somedomain.com" />
    );
    expect(container.querySelectorAll('meta')).toHaveLength(27);
  });
});
