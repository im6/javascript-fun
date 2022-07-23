import {
  groupSite,
  groupGithub,
  generateCateMap,
  parseStarNum,
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
  test('parseStarNum func', () => {
    const num = 75422;
    expect(
      parseStarNum(
        `<div><span class="Counter social-count js-social-count" href="/angular/angular/stargazers" aria-label="${num} users starred this repository">75.4k</a></div>`
      )
    ).toBe(num);
    expect(
      parseStarNum(
        `<div><a href="/angular/angular/stargazers" aria-label="${num} users starred this repository">75.4k</a></div>`
      )
    ).toBeNull();
  });
});
