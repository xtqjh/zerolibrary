/**
 * @作者: zc
 * @时间: 2019-03-13 17:55:36
 * @描述: 是否大于等于
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isGreaterEqualThan' })
export class IsGreaterEqualThanPipe implements PipeTransform {
  transform(input: number, other: number): boolean {
    return input >= other;
  }
}
