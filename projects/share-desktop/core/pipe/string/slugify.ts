/**
 * @作者: zc
 * @时间: 2019-03-14 15:25:57
 * @描述: 重击一个字符串（小写并在单词之间加破折号）。
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'slugify' })
export class SlugifyPipe implements PipeTransform {
  transform(str: string): string {
    return isString(str)
      ? str
          .toLowerCase()
          .trim()
          .replace(/[^\w\-]+/g, ' ')
          .replace(/\s+/g, '-')
      : str;
  }
}
