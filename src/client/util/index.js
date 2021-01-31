export const debounce = (func, wait, immediate) => {
  let timeout;
  return function fn(...args) {
    // must use function notation
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && Boolean(!timeout);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    callNow && func.apply(context, args); // eslint-disable-line no-unused-expressions
  };
};

export const getNow = () => {
  const now = new Date();
  return now.toDateString();
};
