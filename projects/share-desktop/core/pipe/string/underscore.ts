/**
 * @作者: zc
 * @时间: 2019-03-14 15:28:13
 * @描述: 将camelcase字符串转换为下划线。
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'underscore' })
export class UnderscorePipe implements PipeTransform {
  transform(input: string, chars?: string): string;
  transform(input: any, chars?: string): any;

  transform(text: any, chars: string = '\\s'): string {
    return isString(text)
      ? text
          .trim()
          .replace(/\s+/g, '')
          .replace(/[A-Z]/g, (c: string, k: any) => {
            return k ? `_${c.toLowerCase()}` : c.toLowerCase();
          })
      : text;
  }
}
