import { render } from '@testing-library/react';
import TopNav from '.';
import { topNavConfig } from '../../../../../config';

describe('render properly', () => {
  test('render correct', () => {
    const url = 'www.github.com';
    const { getByRole, rerender } = render(
      <TopNav
        url={url}
        showDarkSwitch
        topNavConfig={topNavConfig.filter((v) => v.alt !== 'add')}
        iconCdnUrl="www.cdn.com"
      />
    );
    rerender(
      <TopNav url={url} topNavConfig={topNavConfig} iconCdnUrl="www.cdn.com" />
    );
    expect(getByRole('group')).toBeTruthy();
  });
});
