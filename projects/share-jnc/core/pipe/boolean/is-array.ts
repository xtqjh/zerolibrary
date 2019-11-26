/**
 * @作者: zc
 * @时间: 2019-03-13 17:52:55
 * @描述: 是否数组
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isArray' })
export class IsArrayPipe implements PipeTransform {
  transform(input: any): boolean {
    return Array.isArray(input);
  }
}
