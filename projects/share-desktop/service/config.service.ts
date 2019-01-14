import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GatewayUrl } from 'jsw-electron-sdk';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public url = {
    auth: `${GatewayUrl}/auth/`, // 授权
    custom: `${GatewayUrl}/custom/`, // 客户
    jswapi: `${GatewayUrl}/jswapi/public/`, // 大多数都是cj那边接口
    appapi: `${GatewayUrl}/app/api/`, // appapi
    fileapi: `${GatewayUrl}/file-disk/api/`, // 文件盘
    hr: `${GatewayUrl}/hr/`, // 人力资源
    cost: `${GatewayUrl}/cost/`, // 费用
    address: `${GatewayUrl}/address/api/`, // 地址
    outer: `${GatewayUrl}/outerwork/`, // 工作区域
    live: `${GatewayUrl}/online-audit/`, // 直播审核
    ex: `${GatewayUrl}/exhibition/`, // 展会会议
    pay: `${GatewayUrl}/pay/`, // 支付
    note: `${GatewayUrl}/note/`, // 笔记
    contract: `${GatewayUrl}/contracts/`, // 合同
    oa: `${GatewayUrl}/oa/`, // OA
    orders: `${GatewayUrl}/orders/`, // 订单
  };

  /**
   * 对象格式化拼接
   * @param data [对象 eg:{a:'a',b:'b',c:1}]
   * return a=a&b=b&c=1
   */
  formatGetUrl(data: any) {
    // this.defaultPaging(data)
    let ret = '';
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        ret = ret.length > 0 ? (ret + '&') : ret;
        ret = ret + i + '=' + data[i];
      }
    }
    return ret;
  }

}

export interface Result<T> {
  errCode: number;
  msg: string;
  content: T;
  data?: any;
}


export interface Page<T> {
  content: Array<T>;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
}

