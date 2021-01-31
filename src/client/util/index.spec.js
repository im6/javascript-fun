import { debounce, getNow } from '.';

describe('debounce', () => {
  test('repeat calling', () => {
    jest.useFakeTimers();
    const a = debounce(() => {}, 1);
    const b = debounce(() => {}, 1, true);
    a();
    a();
    b();
    b();
    jest.runAllTimers();
  });
});

describe('getNow', () => {
  test('run onece', () => {
    expect(typeof getNow()).toBe('string');
  });
});
