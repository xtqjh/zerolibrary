

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


/**
 * 驼峰转下划线
 * @param _humpStr eg: fooStyleCss
 */
export function humpToLower(_humpStr) {
  return _humpStr.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 下划线转驼峰
 * @param _lowerStr foo_style_css
 */
export function lowerToHump(_lowerStr) {
  return _lowerStr.replace(/_([a-z])/g, function (all, letter) {
    return letter.toUpperCase();
  });
}


