import { render } from '@testing-library/react';
import PureCss from '.';

describe('render properly', () => {
  test('render correct', () => {
    const { container } = render(<PureCss />);
    expect(container.querySelectorAll('style')).toHaveLength(1);
  });
});
