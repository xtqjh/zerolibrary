/**
 * @作者: zc
 * @时间: 2019-03-14 15:09:53
 * @描述: 重复字符串n次
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'repeat' })
export class RepeatPipe implements PipeTransform {
  transform(str: string, n: number = 1, separator: string = ''): string {
    if (n <= 0) {
      throw new RangeError();
    }

    return n === 1 ? str : this.repeat(str, n - 1, separator);
  }

  private repeat(str: string, n: number, separator: string): string {
    return isString(str) ? (n === 0 ? str : str + separator + this.repeat(str, n - 1, separator)) : str;
  }
}
