/**
 * @作者: zc
 * @时间: 2019-03-13 17:55:01
 * @描述: 是否函数
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isFunction } from '../helpers/helpers';

@Pipe({ name: 'isFunction' })
export class IsFunctionPipe implements PipeTransform {
  transform(input: any): boolean {
    return isFunction(input);
  }
}
