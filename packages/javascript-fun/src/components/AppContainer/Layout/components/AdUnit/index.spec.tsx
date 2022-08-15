import { render } from '@testing-library/react';
import AdUnit from '.';

describe('render properly', () => {
  test('render correct', () => {
    const client = 'manager';
    const { container } = render(<AdUnit client={client} slot="1998" />);
    expect(container.querySelector('ins')).toBeTruthy();
  });
});
