/**
 * @作者: zc
 * @时间: 2019-03-13 17:18:38
 * @描述: 差异
 * @实例: <element *ngFor="let item of [1, 2, 3, 4] | diff: [1, 2]"> <!-- Array: [3, 4] -->
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'diff' })
export class DiffPipe implements PipeTransform {
  transform(input: any[], ...args: any[]): any[];
  transform<T>(input: T, ...args: any[]): T;

  transform(input: any, ...args: any[]): any {
    if (!Array.isArray(input)) {
      return input;
    }

    // tslint:disable-next-line no-bitwise
    return args.reduce((d, c) => d.filter((e: any) => !~c.indexOf(e)), input);
  }
}
