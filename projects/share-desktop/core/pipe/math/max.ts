/**
 * @作者: zc
 * @时间: 2019-03-13 18:09:24
 * @描述: 返回给定数组的最大值
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'max' })
export class MaxPipe implements PipeTransform {
  transform(arr: any): number | number[] {
    return Array.isArray(arr) ? Math.max(...arr) : arr;
  }
}
