/**
 * @作者: zc
 * @时间: 2019-03-14 15:28:35
 * @描述: 在前缀和后缀之间换行
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'wrap' })
export class WrapPipe implements PipeTransform {
  transform(str: string, prefix: string = '', suffix: string = ''): string {
    if (!isString(str)) {
      return str;
    }

    return (!!prefix && isString(prefix) ? prefix : '') + str + (!!suffix && isString(suffix) ? suffix : '');
  }
}
