/**
 * @作者: zc
 * @时间: 2019-03-13 18:09:31
 * @描述: 返回给定数组的最小值
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'min' })
export class MinPipe implements PipeTransform {
  transform(arr: any): number | number[] {
    return Array.isArray(arr) ? Math.min(...arr) : arr;
  }
}
