export function captureErrors<Args, T>(
  fn: (...Args) => Promise<T>,
): (...Args) => Promise<T> {
  return (...args) => {
    try {
      return fn(...args);
    } catch (err) {
      handleError(err);
    }
  };
}

function handleError(err: Error) {
  console.error(err);
}
