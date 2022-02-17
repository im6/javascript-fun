import { render } from '@testing-library/react';
import BackToTop from '.';

describe('render properly', () => {
  test('render correct', () => {
    const pageSpeedUrl = 'www.cnn.com';
    const { container } = render(<BackToTop iconCdnUrl={pageSpeedUrl} />);
    expect(container.querySelector('img')).toBeTruthy();
  });
});
