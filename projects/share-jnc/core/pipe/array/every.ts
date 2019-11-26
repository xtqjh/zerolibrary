/**
 * @作者: zc
 * @时间: 2019-03-13 17:21:39
 * @描述: 数组的每个元素都符合谓词，则返回true，否则返回false
 * @实例:
 * this.itemsOne = [1, 1, 1];
 * this.itemsTwo = [1, 1, 2];
 * this.itemsThree = [2, 2, 2];
 * this.predicate = (value: any, index: number, array: any[]): boolean => {
 *    return value === 1;
 * };
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'every' })
export class EveryPipe implements PipeTransform {
  transform(input: any, predicate: (value: any, index: number, array: any[]) => boolean): boolean | any[] {
    return Array.isArray(input) ? input.every(predicate) : false;
  }
}
