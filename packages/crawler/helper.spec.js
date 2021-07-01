const { groupSite, groupGithub, convertGroupIcon } = require('./helper');
const { cateMock, siteMock, githubMock } = require('../../testing/mockData');

describe('test packages/crawler helper', () => {
  test('convertGroupIcon', () => {
    const res = convertGroupIcon(cateMock);
    expect(Object.keys(res)).toHaveLength(3);
  });

  test('groupSite func', () => {
    const res = groupSite(siteMock, cateMock);
    expect(res[0].list).toHaveLength(
      siteMock.filter((v) => v.grp === 1).length
    );
  });

  test('groupGithub func', () => {
    const res = groupGithub(githubMock, convertGroupIcon(cateMock));
    expect(res[0].icon).toBe('jquery.svg');
    expect(res[0].list).toHaveLength(
      githubMock.filter((v) => v.grp === 2).length
    );
  });
});
