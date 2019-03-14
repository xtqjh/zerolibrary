/**
 * @作者: zc
 * @时间: 2019-03-14 09:46:30
 * @描述: 返回对象值数组
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from '../helpers/helpers';

@Pipe({ name: 'values' })
export class ValuesPipe implements PipeTransform {
  transform(obj: any): any[] {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }

    return Object.keys(obj).map(k => obj[k]);
  }
}
