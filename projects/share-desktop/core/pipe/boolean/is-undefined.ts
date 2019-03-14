/**
 * @作者: zc
 * @时间: 2019-03-13 18:01:43
 * @描述: 是否未定义
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isUndefined } from '../helpers/helpers';

@Pipe({ name: 'isUndefined' })
export class IsUndefinedPipe implements PipeTransform {
  transform(input: any): boolean {
    return isUndefined(input);
  }
}
