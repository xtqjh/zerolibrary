/**
 * @作者: zc
 * @时间: 2019-03-13 17:58:32
 * @描述: 是否小于
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isLessThan' })
export class IsLessThanPipe implements PipeTransform {
  transform(input: number, other: number): boolean {
    return input < other;
  }
}
