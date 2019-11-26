/**
 * @作者: zc
 * @时间: 2019-03-13 17:52:11
 * @描述: 返回不带特定元素的数组
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'without' })
export class WithoutPipe implements PipeTransform {
  transform(input: any[], args?: any[]): any[];
  transform(input: any, args?: any[]): any;

  transform(input: any, args: any[] = []): any[] {
    return Array.isArray(input)
      ? // tslint:disable-next-line:no-bitwise
        input.filter(e => !~args.indexOf(e))
      : input;
  }
}
