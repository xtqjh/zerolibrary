/**
 * @作者: zc
 * @时间: 2019-03-13 17:57:14
 * @描述: 是否相同
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isIdenticalTo' })
export class IsIdenticalToPipe implements PipeTransform {
  transform(input: any, other: any): boolean {
    return input === other;
  }
}
