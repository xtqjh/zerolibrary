/**
 * @作者: zc
 * @时间: 2019-03-13 17:26:16
 * @描述: 展平嵌套数组
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'flatten' })
export class FlattenPipe implements PipeTransform {
  transform(input: any[], shallow?: boolean): any[];
  transform<T>(input: T, shallow?: boolean): T;

  transform(input: any, shallow: boolean = false): any {
    if (!Array.isArray(input)) {
      return input;
    }

    return shallow ? [].concat.apply([], input) : this.flatten(input);
  }

  private flatten(array: any[]): any[] {
    return array.reduce((arr: any[], elm: any) => {
      if (Array.isArray(elm)) {
        return arr.concat(this.flatten(elm));
      }

      return arr.concat(elm);
    }, []);
  }
}
