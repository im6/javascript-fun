import { debounce, getNow } from '.';

describe('debounce', () => {
  test('repeat calling', () => {
    jest.useFakeTimers();
    const a = debounce(() => {}, 1);
    a();
    a();
    jest.runAllTimers();
  });
});

describe('getNow', () => {
  test('run onece', () => {
    expect(typeof getNow()).toBe('string');
  });
});
