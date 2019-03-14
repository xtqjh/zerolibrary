/**
 * @作者: zc
 * @时间: 2019-03-14 09:44:33
 * @描述: 返回具有反转键和值的对象。如果值相等，后续值将覆盖先前值的属性分配。
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from '../helpers/helpers';

@Pipe({ name: 'invert' })
export class InvertPipe implements PipeTransform {
  transform(obj: any): Object {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }

    return Object.keys(obj).reduce((o, k) => {
      return Object.assign(o, { [obj[k]]: k });
    }, {});
  }
}
