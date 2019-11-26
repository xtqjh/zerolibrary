/**
 * @作者: zc
 * @时间: 2019-03-13 17:58:11
 * @描述: 是否小于等于
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isLessEqualThan' })
export class IsLessEqualThanPipe implements PipeTransform {
  transform(input: number, other: number): boolean {
    return input <= other;
  }
}
