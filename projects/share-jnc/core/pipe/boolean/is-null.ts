/**
 * @作者: zc
 * @时间: 2019-03-13 18:00:49
 * @描述: 是否为空
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isNull' })
export class IsNullPipe implements PipeTransform {
  transform(input: any): boolean {
    return input === null;
  }
}
