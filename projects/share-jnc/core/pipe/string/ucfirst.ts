/**
 * @作者: zc
 * @时间: 2019-03-14 15:27:33
 * @描述: 第一个单词的大写首字母
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'ucfirst' })
export class UcFirstPipe implements PipeTransform {
  transform(input: string): string;
  transform(input: any): any;

  transform(text: any): string {
    return isString(text) ? text.slice(0, 1).toUpperCase() + text.slice(1) : text;
  }
}
