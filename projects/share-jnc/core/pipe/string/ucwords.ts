/**
 * @作者: zc
 * @时间: 2019-03-14 15:27:52
 * @描述: 每个单词的大写首字母
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'ucwords' })
export class UcWordsPipe implements PipeTransform {
  transform(input: string): string;
  transform(input: any): any;

  transform(text: any): string {
    if (isString(text)) {
      return text
        .split(' ')
        .map((sub: any) => sub.slice(0, 1).toUpperCase() + sub.slice(1))
        .join(' ');
    }

    return text;
  }
}
