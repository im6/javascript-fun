import {
  groupSite,
  groupGithub,
  generateCateMap,
  parseExtractGithub,
} from './helper';

import { cateMock, siteMock, githubMock } from './mockData';

describe('test packages/crawler helper', () => {
  test('generateCateMap', () => {
    const res = generateCateMap(cateMock);
    expect(res.size).toEqual(3);
  });

  test('groupSite func', () => {
    const res = groupSite(siteMock, cateMock);
    expect(res[0].list).toHaveLength(
      siteMock.filter((v) => v.category === 1).length
    );
  });

  test('groupGithub func', () => {
    const res = groupGithub(githubMock, generateCateMap(cateMock));
    expect(res[0].icon).toBe('jquery.svg');
    expect(res[0].list).toHaveLength(
      githubMock.filter((v) => v.category === 2).length
    );
  });
  test('parseExtractGithub func', () => {
    const num = 75422;
    const lastISO = '2022-07-24T14:25:13Z';
    expect(
      parseExtractGithub(
        `<div><span class="Counter social-count js-social-count" href="/angular/angular/stargazers" aria-label="${num} users starred this repository">75.4k</span><relative-time datetime="${lastISO}">43 minutes ago</relative-time>
        </div>`
      )
    ).toEqual({
      star: num,
      lastUpdate: lastISO,
    });
    expect(
      parseExtractGithub(
        `<div><a href="/angular/angular/stargazers" aria-label="${num} users starred this repository">75.4k</a></div>`
      )
    ).toEqual({
      star: -1,
      lastUpdate: null,
    });
  });
});
