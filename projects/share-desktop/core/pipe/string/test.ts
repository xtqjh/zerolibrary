/**
 * @作者: zc
 * @时间: 2019-03-14 15:26:46
 * @描述: 测试字符串是否与模式匹配。
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../helpers/helpers';

@Pipe({ name: 'test' })
export class TestPipe implements PipeTransform {
  transform(text: string, pattern: string, flags?: string): boolean;
  transform<T>(text: T, pattern: string, flags?: string): T;

  transform(text: any, pattern: string, flags?: string): any {
    if (!isString(text)) {
      return text;
    }

    return new RegExp(pattern, flags).test(text);
  }
}
