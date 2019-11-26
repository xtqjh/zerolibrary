/**
 * @作者: zc
 * @时间: 2019-03-13 18:12:10
 * @描述: 返回给定数组的和
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sum' })
export class SumPipe implements PipeTransform {
  transform(num: any[]): number;
  transform<T>(num: any): T;

  transform(arr: any): any {
    return Array.isArray(arr) ? arr.reduce((sum, curr) => sum + curr, 0) : arr;
  }
}
