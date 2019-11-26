/**
 * @作者: zc
 * @时间: 2019-03-13 17:59:16
 * @描述: 是否不等于
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isNotEqualTo' })
export class IsNotEqualToPipe implements PipeTransform {
  transform(input: any, other: any): boolean {
    // tslint:disable-next-line:triple-equals
    return input != other;
  }
}
