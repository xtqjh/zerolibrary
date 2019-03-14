/**
 * @作者: zc
 * @时间: 2019-03-13 18:01:14
 * @描述: 是否对象
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from '../helpers/helpers';

@Pipe({ name: 'isObject' })
export class IsObjectPipe implements PipeTransform {
  transform(input: any): boolean {
    return isObject(input);
  }
}
