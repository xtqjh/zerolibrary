/**
 * @作者: zc
 * @时间: 2019-03-13 18:02:32
 * @描述: 返回带有单位符号的字节
 * @实例:
 * <p>{{ 10 | bytes }}</p> <!-- Output: "10 B" -->
 * <p>{{ 1048576 | bytes }}</p> <!-- Output: "1 KB" -->
 * <p>{{ 1073741824 | bytes }}</p> <!-- Output: "1 MB" -->
 * <p>{{ 1.0995116e12 | bytes }}</p> <!-- Output: "1 GB" -->
 */
import { Pipe, PipeTransform } from '@angular/core';
import { applyPrecision, isNumberFinite, isUndefined } from '../helpers/helpers';

@Pipe({ name: 'bytes' })
export class BytesPipe implements PipeTransform {
  private dictionary: Array<{ max: number; type: string }> = [
    { max: 1024, type: 'B' },
    { max: 1048576, type: 'KB' },
    { max: 1073741824, type: 'MB' },
    { max: 1.0995116e12, type: 'GB' },
  ];

  transform(value: number, precision?: number | undefined): string | number {
    if (!isNumberFinite(value)) {
      return NaN;
    }

    const format = this.dictionary.find(d => value < d.max) || this.dictionary[this.dictionary.length - 1];
    const calc = value / (format.max / 1024);
    const num = isUndefined(precision) ? calc : applyPrecision(calc, precision);

    return `${num} ${format.type}`;
  }
}
