/**
 * @作者: zc
 * @时间: 2019-03-13 17:53:32
 * @描述: 是否定义
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isUndefined } from '../helpers/helpers';

@Pipe({ name: 'isDefined' })
export class IsDefinedPipe implements PipeTransform {
  transform(input: any): boolean {
    return !isUndefined(input);
  }
}
