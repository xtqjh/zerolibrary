/**
 * @作者: zc
 * @时间: 2019-03-13 17:55:50
 * @描述: 是否大于
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isGreaterThan' })
export class IsGreaterThanPipe implements PipeTransform {
  transform(input: number, other: number): boolean {
    return input > other;
  }
}
