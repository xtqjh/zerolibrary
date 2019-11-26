/**
 * @作者: zc
 * @时间: 2019-03-13 17:30:28
 * @描述: 交集
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'intersection' })
export class IntersectionPipe implements PipeTransform {
  transform(input: any[], ...args: any[]): any[];
  transform<T>(input: T, ...args: any[]): T;

  transform(input: any, ...args: any[]): any {
    if (!Array.isArray(input)) {
      return input;
    }

    // tslint:disable-next-line no-bitwise
    return args.reduce((n, c) => n.filter((e: any) => !!~c.indexOf(e)), input);
  }
}
