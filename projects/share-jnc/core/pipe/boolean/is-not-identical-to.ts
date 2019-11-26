/**
 * @作者: zc
 * @时间: 2019-03-13 18:00:15
 * @描述: 是否不等于
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isNotIdenticalTo' })
export class IsNotIdenticalToPipe implements PipeTransform {
  transform(input: any, other: any): boolean {
    return input !== other;
  }
}
