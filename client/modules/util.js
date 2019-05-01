export const debounce = (func, wait) => {
  let timeout;
  return function() {
    // must use function notation
    const context = this, args = arguments;
    const later = () => {
      timeout = null
    }
    const callNow = Boolean(!timeout)
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    callNow && func.apply(context, args);
  }
}