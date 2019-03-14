/**
 * @作者: zc
 * @时间: 2019-03-14 09:45:46
 * @描述: 返回对象键值对的数组
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from '../helpers/helpers';

@Pipe({ name: 'pairs' })
export class PairsPipe implements PipeTransform {
  transform(obj: any): any[] {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }

    return Object.keys(obj).map(k => [k, obj[k]]);
  }
}
