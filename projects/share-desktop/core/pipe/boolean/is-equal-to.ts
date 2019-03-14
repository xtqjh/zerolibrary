/**
 * @作者: zc
 * @时间: 2019-03-13 17:54:23
 * @描述: 是否指定值
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isEqualTo' })
export class IsEqualToPipe implements PipeTransform {
  transform(input: any, other: any): boolean {
    // tslint:disable-next-line:triple-equals
    return input == other;
  }
}
