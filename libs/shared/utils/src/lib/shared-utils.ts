export const useDebounce = (
  cb: CallableFunction,
  delay = 500
): ((...args: any[]) => any) => {
  let cbTimer: number | null = null;

  clearTimeout();
  return (...args: any) => {
    if (cbTimer) {
      console.log('Nam data is: clear');
      clearTimeout(cbTimer);
    }
    cbTimer = window.setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
