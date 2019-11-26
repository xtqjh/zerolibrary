/**
 * @作者: zc
 * @时间: 2019-03-14 09:40:14
 * @描述: 返回两个对象的差异对象
 */
import { Pipe, PipeTransform } from '@angular/core';
import { getKeysTwoObjects, isDeepEqual, isObject } from '../helpers/helpers';

@Pipe({ name: 'diffObj' })
export class DiffObjPipe implements PipeTransform {
  transform(obj: any, original: any = {}): any {
    if (Array.isArray(obj) || Array.isArray(original) || !isObject(obj) || !isObject(original)) {
      return {};
    }

    return getKeysTwoObjects(obj, original).reduce((diff: any, key: any) => {
      if (!isDeepEqual(original[key], obj[key])) {
        diff[key] = obj[key];
      }

      return diff;
    }, {});
  }
}
