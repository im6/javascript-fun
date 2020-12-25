import { render } from '@testing-library/react';
import MetaInfo from '.';

describe('render properly', () => {
  test('render correct', () => {
    const { container } = render(<MetaInfo author="hello" year="2020" />);
    expect(container.querySelectorAll('meta')).toHaveLength(27);
  });
});
