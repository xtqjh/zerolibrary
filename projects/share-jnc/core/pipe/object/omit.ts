/**
 * @作者: zc
 * @时间: 2019-03-14 09:45:23
 * @描述: 从对象中省略键后返回对象（与pick相反）
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from '../helpers/helpers';

@Pipe({ name: 'omit' })
export class OmitPipe implements PipeTransform {
  transform(obj: any, ...args: Array<string>): Object {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }

    return (
      Object.keys(obj)
        // tslint:disable-next-line:no-bitwise
        .filter(k => !~args.indexOf(k))
        .reduce((o, k) => {
          return Object.assign(o, { [k]: obj[k] });
        }, {})
    );
  }
}
