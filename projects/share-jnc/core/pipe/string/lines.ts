/**
 * @作者: zc
 * @时间: 2019-03-14 15:05:39
 * @描述: 将具有回车行的字符串转换为每行的数组。
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'lines' })
export class LinesPipe implements PipeTransform {
  transform(text: any, chars: string = '\\s'): Array<string> | any {
    return isString(text) ? text.replace(/\r\n/g, '\n').split('\n') : text;
  }
}
