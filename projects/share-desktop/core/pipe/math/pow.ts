/**
 * @作者: zc
 * @时间: 2019-03-13 18:10:43
 * @描述: 返回数字的幂
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pow' })
export class PowerPipe implements PipeTransform {
  transform(num: number, power?: number): number;
  transform(num: any, power?: number): any;

  transform(num: any, power: number = 2): number {
    return !isNaN(num) ? num ** power : num;
  }
}
