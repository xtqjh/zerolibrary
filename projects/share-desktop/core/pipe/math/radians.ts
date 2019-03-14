/**
 * @作者: zc
 * @时间: 2019-03-13 18:11:04
 * @描述: 返回以度为单位的数值的弧度
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isNumberFinite } from '../helpers/helpers';

@Pipe({ name: 'radians' })
export class RadiansPipe implements PipeTransform {
  transform(degrees: number): number {
    if (!isNumberFinite(degrees)) {
      return NaN;
    }

    return (degrees * Math.PI) / 180;
  }
}
