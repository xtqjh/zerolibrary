/**
 * @作者: zc
 * @时间: 2019-03-14 15:24:17
 * @描述: 使用给定的填充字符将字符串右填充到给定长度（默认为空格）
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'rpad' })
export class RightPadPipe implements PipeTransform {
  transform(str: string, length: number = 1, padCharacter: string = ' '): string {
    if (!isString(str) || str.length >= length) {
      return str;
    }
    while (str.length < length) {
      str = str + padCharacter;
    }

    return str;
  }
}
