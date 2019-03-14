/**
 * @作者: zc
 * @时间: 2019-03-14 09:46:07
 * @描述: 返回从对象中选取键的对象
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from '../helpers/helpers';

@Pipe({ name: 'pick' })
export class PickPipe implements PipeTransform {
  transform(obj: any, ...args: Array<string>): Object {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }

    return args.reduce((o, k) => {
      return Object.assign(o, { [k]: obj[k] });
    }, {});
  }
}
