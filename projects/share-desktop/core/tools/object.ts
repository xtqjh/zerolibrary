import { humpToLower } from "./string";


/**
 * 对象是否相等
 * @param objA 检查对象A
 * @param objB 检查对象B
 */
export function shallowEqual(objA: {}, objB: {}): boolean {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // tslint:disable-next-line:prefer-for-of
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];
    if (!bHasOwnProperty(key)) {
      return false;
    }
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}


/**
 * 对象深度复制
 * @param obj 对象
 */
export function isClone(obj: any) {
  if (null == obj || 'object' !== typeof obj) { return obj; }
  if (obj instanceof Date) {
    const copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    const copy = [];
    for (let i = 0, len = obj.length; i < len; ++i) {
      copy[i] = this.isClone(obj[i]);
    }
    return copy;
  }
  if (obj instanceof Object) {
    const copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) { copy[attr] = this.isClone(obj[attr]); }
    }
    return copy;
  }
  throw new Error('Unable to copy obj! Its type isn\'t supported.');
}

/**
 * 删除对象中指定属性
 * @param obj  [受检查对象]
 * @param keys [指定属性]
 * 使用方法: isObjectDelKay(obj, "id")
 */
export function isObjectDelKay(obj: any, keys: string) {
  if (!Array.isArray(obj)) {
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (i === keys) {
          delete obj[i];
        }
        if (Array.isArray(obj[i])) {
          this.isObjectDelKay(obj[i], keys);
        }
      }
    }
  } else {
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        this.isObjectDelKay(obj[i], keys);
      }
    }
  }
  return obj;
}

/**
 * 对象格式化拼接
 * @param data [对象 eg:{a:'a',b:'b',c:1}]
 * @returns a=a&b=b&c=1
 */
export function setFormatGetUrl(data: any): string {
  // this.defaultPaging(data)
  let ret = '';
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      ret = ret.length > 0 ? (ret + '&') : ret;
      ret = ret + i + '=' + data[i];
    }
  }
  return ret;
}


/**
 * 对象中驼峰属性转换为下划线
 * @param obj 对象
 */
export function objectFormatKey(obj) {
  let $jsonStr = JSON.stringify(obj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      $jsonStr = $jsonStr.replace(key, humpToLower(key));
    }
  }
  return JSON.parse($jsonStr);
}
