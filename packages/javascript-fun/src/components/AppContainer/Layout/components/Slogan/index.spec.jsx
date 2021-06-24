import { render } from '@testing-library/react';
import Slogan from '.';

describe('render properly', () => {
  test('render correct', () => {
    const text = 'hello world';
    const { queryByText, rerender } = render(<Slogan text={null} />);
    rerender(<Slogan text={text} />);
    expect(queryByText(text)).toBeTruthy();
  });
});
