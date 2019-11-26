/**
 * @作者: zc
 * @时间: 2019-03-13 18:05:59
 * @描述: 返回以弧度表示的数字的度数
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isNumberFinite } from '../helpers/helpers';

@Pipe({ name: 'degrees' })
export class DegreesPipe implements PipeTransform {
  transform(radians: number): number {
    if (!isNumberFinite(radians)) {
      return NaN;
    }

    return (radians * 180) / Math.PI;
  }
}
