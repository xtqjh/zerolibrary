

/**
 * 随机字符串
 * @param size 长度
 */
export function isGuid(size: number) {
  let guid = '';
  for (let i = 1; i <= size; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
  }
  return guid;
}

