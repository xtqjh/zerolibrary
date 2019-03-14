/**
 * @作者: zc
 * @时间: 2019-03-13 18:03:56
 * @描述: 浮点型按精度返回数字
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ceil' })
export class CeilPipe implements PipeTransform {
  transform(num: number, precision: number = 0): number {
    if (precision <= 0) {
      return Math.ceil(num);
    }

    const tho = 10 ** precision;

    return Math.ceil(num * tho) / tho;
  }
}
