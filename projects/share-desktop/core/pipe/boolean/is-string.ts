/**
 * @作者: zc
 * @时间: 2019-03-13 18:01:23
 * @描述: 是否字符串
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'isString' })
export class IsStringPipe implements PipeTransform {
  transform(input: any): boolean {
    return isString(input);
  }
}
