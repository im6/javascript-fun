const { groupSite, groupGithub } = require('./helper');
const { cateMock, siteMock, githubMock } = require('../../testing/mockData');

describe('test packages/crawler helper', () => {
  test('groupSite func', () => {
    const res = groupSite(siteMock, cateMock);
    expect(res[0].list).toHaveLength(
      siteMock.filter((v) => v.grp === 1).length
    );
  });

  test('groupGithub func', () => {
    const res = groupGithub(githubMock, { k2: cateMock[1] });
    expect(res[0].icon).toBe('jquery.svg');
    expect(res[0].list).toHaveLength(
      githubMock.filter((v) => v.grp === 2).length
    );
  });
});
