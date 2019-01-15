

/**
 * 判断样式是否存在
 * @param elem element
 * @param cls 样式名称
 */
export function hasClass(elem, cls): boolean {
  cls = cls || '';
  // 当cls没有参数时，返回false
  if (cls.replace(/\s/g, '').length === 0) { return false; }
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

/**
 * 添加样式名
 * @param ele element
 * @param cls 样式名称
 */
export function addClass(ele, cls) {
  if (!this.hasClass(ele, cls)) {
    ele.className = ele.className === '' ? cls : ele.className + ' ' + cls;
  }
}

/**
 * 删除样式名
 * @param richtxt 对象
 * @param cls 样式名
 */
export function delClass(richtxt: any, cls: string) {
  let obj_class = ' ' + richtxt.className + ' '; // 获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
  obj_class = obj_class.replace(/(\s+)/gi, ' '); // 将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
  let removed = obj_class.replace(' ' + cls + ' ', ' '); // 在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
  removed = removed.replace(/(^\s+)|(\s+$)/g, ''); // 去掉首尾空格. ex) 'bcd ' -> 'bcd'
  richtxt.className = removed; // 替换原来的 class.
}

/**
 * 随机生成颜色
 */
export function getRandomColor() {
  // tslint:disable-next-line:no-bitwise
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}
