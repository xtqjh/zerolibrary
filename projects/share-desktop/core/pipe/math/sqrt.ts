/**
 * @作者: zc
 * @时间: 2019-03-13 18:11:51
 * @描述: 返回数字的平方根
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sqrt' })
export class SqrtPipe implements PipeTransform {
  transform(num: number): number;
  transform<T>(num: T): T;

  transform(num: any): any {
    return !isNaN(num) ? Math.sqrt(num) : num;
  }
}
