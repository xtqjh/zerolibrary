/**
 * @作者: zc
 * @时间: 2019-03-14 15:25:05
 * @描述: 扫描字符串并用数组的等效成员替换i占位符
 */
import { Pipe, PipeTransform } from '@angular/core';
import { isString, isUndefined } from '../helpers/helpers';

@Pipe({ name: 'scan' })
export class ScanPipe implements PipeTransform {
  transform(text: string, args: string[] = []): string {
    return isString(text)
      ? text.replace(/\{(\d+)}/g, (match, index) => (!isUndefined(args[index]) ? args[index] : match))
      : text;
  }
}
