import { error } from './cli';

export function captureErrors<Args, T>(
  fn: (...Args) => Promise<T>,
): (...Args) => Promise<T> {
  return async (...args) => {
    try {
      const ret = await fn(...args);
      return ret;
    } catch (err) {
      // display error in the CLI
      error(err);
    }
  };
}
