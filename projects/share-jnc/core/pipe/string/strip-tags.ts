/**
 * @作者: zc
 * @时间: 2019-03-14 15:26:21
 * @描述: 干啥呢？
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: '从字符串中删除HTML标记并提供不应删除的标记' })
export class StripTagsPipe implements PipeTransform {
  transform(text: string, ...allowedTags: any[]): string {
    return allowedTags.length > 0
      ? text.replace(new RegExp(`<(?!\/?(${allowedTags.join('|')})\s*\/?)[^>]+>`, 'g'), '')
      : text.replace(/<(?:.|\s)*?>/g, '');
  }
}
