/**
 * @作者: zc
 * @时间: 2019-03-13 18:11:30
 * @描述: 按精度返回数字的整数
 */
import { Pipe, PipeTransform } from '@angular/core';
import { applyPrecision } from '../helpers/helpers';

@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
  transform(num: number, precision: number = 0): number {
    return applyPrecision(num, precision);
  }
}
