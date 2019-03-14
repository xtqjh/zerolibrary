/**
 * @作者: zc
 * @时间: 2019-03-13 17:34:54
 * @描述: 返回具有数字范围的数组
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'range' })
export class RangePipe implements PipeTransform {
  transform(start: number = 1, count: number = 0, step: number = 1): any {
    return Array(count)
      .fill('')
      .map((v, i) => step * i + start);
  }
}
