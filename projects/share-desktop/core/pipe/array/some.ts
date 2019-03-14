/**
 * @作者: zc
 * @时间: 2019-03-13 17:39:15
 * @描述: 如果数组的某些元素符合谓词，则返回true，否则返回false
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'some' })
export class SomePipe implements PipeTransform {
  transform(input: any[], predicate: (value: any, index: number, array: any[]) => boolean): boolean;
  transform<T>(input: T, predicate: (value: any, index: number, array: any[]) => boolean): T;

  transform(input: any, predicate: (value: any, index: number, array: any[]) => boolean): any {
    return Array.isArray(input) ? input.some(predicate) : input;
  }
}
