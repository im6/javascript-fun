export const debounce = (
  func: () => void,
  wait: number,
  immediate: boolean
) => {
  let timeout: NodeJS.Timeout;
  return function fn(...args: []) {
    // must use function notation
    // @ts-ignore
    const context = this;
    const later = () => {
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && Boolean(!timeout);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    callNow && func.apply(context, args);
  };
};

export const getNow = () => {
  const now = new Date();
  return now.toDateString();
};
