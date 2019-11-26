/**
 * @作者: zc
 * @时间: 2019-03-13 18:00:57
 * @描述: 是否数值
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from '../helpers/helpers';

@Pipe({ name: 'isNumber' })
export class IsNumberPipe implements PipeTransform {
  transform(input: any): boolean {
    return isNumber(input);
  }
}
