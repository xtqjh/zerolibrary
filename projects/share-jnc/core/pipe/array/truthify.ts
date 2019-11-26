/**
 * @作者: zc
 * @时间: 2019-03-13 17:41:11
 * @描述: 从数组中删除不真实的值
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truthify' })
export class TrurthifyPipe implements PipeTransform {
  transform(input: any[]): any[];
  transform<T>(input: T): T;

  transform(input: any): any {
    return Array.isArray(input) ? input.filter(e => !!e) : input;
  }
}
