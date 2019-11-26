/**
 * @作者: zc
 * @时间: 2019-03-13 18:10:05
 * @描述: 返回数字之间的百分比
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'percentage' })
export class PercentagePipe implements PipeTransform {
  transform(num: number, total?: number, floor?: boolean): number;
  transform<T>(num: T, total?: number, floor?: boolean): T;

  transform(num: any, total: number = 100, floor: boolean = false): any {
    if (isNaN(num)) {
      return num;
    }

    const percent = (num * 100) / total;

    return floor ? Math.floor(percent) : percent;
  }
}
