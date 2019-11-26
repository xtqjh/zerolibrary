import { Injectable } from '@angular/core';
// import { GatewayUrl } from 'jsw-electron-sdk';


export class AbmConfig {
  /**
   * 网关前缀
   */
  GatewayUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(cog: AbmConfig) {
    this.GatewayUrl = cog.GatewayUrl;
  }

  public GatewayUrl: String;

  public url = {
    auth: `${this.GatewayUrl}/auth/`, // 授权
    custom: `${this.GatewayUrl}/custom/`, // 客户
    jswapi: `${this.GatewayUrl}/jswapi/public/`, // 大多数都是cj那边接口
    appapi: `${this.GatewayUrl}/app/api/`, // appapi
    fileapi: `${this.GatewayUrl}/file-disk/api/`, // 文件盘
    hr: `${this.GatewayUrl}/hr/`, // 人力资源
    cost: `${this.GatewayUrl}/cost/`, // 费用
    address: `${this.GatewayUrl}/address/api/`, // 地址
    outer: `${this.GatewayUrl}/outerwork/`, // 工作区域
    live: `${this.GatewayUrl}/online-audit/`, // 直播审核
    ex: `${this.GatewayUrl}/exhibition/`, // 展会会议
    pay: `${this.GatewayUrl}/pay/`, // 支付
    note: `${this.GatewayUrl}/note/`, // 笔记
    contract: `${this.GatewayUrl}/contracts/`, // 合同
    oa: `${this.GatewayUrl}/oa/`, // OA
    orders: `${this.GatewayUrl}/orders/`, // 订单
  };

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

