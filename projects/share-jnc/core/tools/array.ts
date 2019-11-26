
/**
 * 数组是否相等
 */
export function arrayEquals<T>(array1: T[], array2: T[]): boolean {
  if (!array1 || !array2 || array1.length !== array2.length) {
    return false;
  }
  const len = array1.length;
  for (let i = 0; i < len; i++) {
    if (array1[ i ] !== array2[ i ]) {
      return false;
    }
  }
  return true;
}
