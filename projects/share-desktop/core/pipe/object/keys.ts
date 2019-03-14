/**
 * @作者: zc
 * @时间: 2019-03-14 09:45:01
 * @描述: 返回对象键数组
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from '../helpers/helpers';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(obj: any): any[] {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }

    return Object.keys(obj);
  }
}
