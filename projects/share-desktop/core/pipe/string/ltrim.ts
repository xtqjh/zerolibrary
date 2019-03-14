/**
 * @作者: zc
 * @时间: 2019-03-14 15:07:26
 * @描述: 从字符串的开头剥离字符（默认字符为空格）。
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'ltrim' })
export class LeftTrimPipe implements PipeTransform {
  transform(text: string, chars: string = '\\s'): string {
    return isString(text) ? text.replace(new RegExp(`^[${chars}]+`), '') : text;
  }
}
