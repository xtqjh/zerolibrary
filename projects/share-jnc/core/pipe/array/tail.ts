/**
 * @作者: zc
 * @时间: 2019-03-13 17:40:15
 * @描述: 移除开头
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tail' })
export class TailPipe implements PipeTransform {
  transform(input: any[], num?: number): any[];
  transform<T>(input: T, num?: number): T;

  transform(input: any, num: number = 0): any {
    return Array.isArray(input) ? input.slice(num) : input;
  }
}
