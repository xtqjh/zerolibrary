/**
 * @作者: zc
 * @时间: 2018-01-27 10:44:12
 * @描述: 状态翻译
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertStatus'
})
export class ConvertStatusPipe implements PipeTransform {

  private _flow = [
    { key: 'InAudit', value: '待审核' },
    { key: 'Audited', value: '通过' },
    { key: 'Reject', value: '驳回' },
    { key: 'ignore', value: '忽略' },
    { key: 'supersede', value: '转审' },
    { key: 'Finish', value: '完成' },
    { key: 'Cancel', value: '撤销' },
    { key: 'Delete', value: '删除' }
  ];


  transform(value: any, types?: String): String {
    // console.log(value, types);
    let ret = '';
    if (types === 'flow') {
      for (const i in this._flow) {
        if (this._flow[i].key === value) {
          ret = this._flow[i].value;
          return ret;
        }
      }
    }
    return '识别错误';
  }

}
