/**
 * @作者: zc
 * @时间: 2019-03-14 15:24:42
 * @描述: 将字符从字符串结尾剥离（默认字符为空格）。
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'rtrim' })
export class RightTrimPipe implements PipeTransform {
  transform(text: string, chars: string = '\\s'): string {
    return isString(text) ? text.replace(new RegExp(`[${chars}]+$`), '') : text;
  }
}
