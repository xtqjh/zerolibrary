import { Injectable, Inject } from '@angular/core';


export class CampConfig {

  /**
   * 网关地址
   */
  GatewayUrl: string;

  /**
   * 生产环境
   */
  Production?: boolean;

  /**
   * 调试环境下固定 TOKEN
   */
  DebugToken?: string;

  url?: LoadUrl;
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public CampConfig: CampConfig;

  // @Inject('CampConfig') public cog: CampConfig
  constructor(
    cog: CampConfig
  ) {
    console.log(cog);
    this.CampConfig = cog;
    Object.assign(this.$URL = {
      auth: `${this.CampConfig.GatewayUrl}/auth/`, // 授权
      custom: `${this.CampConfig.GatewayUrl}/custom/`, // 客户
      jswapi: `${this.CampConfig.GatewayUrl}/public/`, // 大多数都是cj那边接口
      appapi: `${this.CampConfig.GatewayUrl}/app/api/`, // appapi
      fileapi: `${this.CampConfig.GatewayUrl}/file-disk/api/`, // 文件盘
      hr: `${this.CampConfig.GatewayUrl}/hr/`, // 人力资源
      cost: `${this.CampConfig.GatewayUrl}/cost/`, // 费用
      address: `${this.CampConfig.GatewayUrl}/address/api/`, // 地址
      outer: `${this.CampConfig.GatewayUrl}/outerwork/`, // 工作区域
      live: `${this.CampConfig.GatewayUrl}/online-audit/`, // 直播审核
      ex: `${this.CampConfig.GatewayUrl}/exhibition/`, // 展会会议
      pay: `${this.CampConfig.GatewayUrl}/pay/`, // 支付
      note: `${this.CampConfig.GatewayUrl}/note/`, // 笔记
      contract: `${this.CampConfig.GatewayUrl}/contracts/`, // 合同
      oa: `${this.CampConfig.GatewayUrl}/oa/`, // OA
      orders: `${this.CampConfig.GatewayUrl}/orders/`, // 订单
    }, this.CampConfig.url || {});
    console.log(this.$URL);
  }

  private $URL: LoadUrl;

  get url() {
    return this.$URL;
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

export interface LoadUrl {
  auth?: string;
  custom?: string;
  jswapi?: string;
  appapi?: string;
  fileapi?: string;
  hr?: string;
  cost?: string;
  address?: string;
  outer?: string;
  live?: string;
  ex?: string;
  pay?: string;
  note?: string;
  contract?: string;
  oa?: string;
  orders?: string;
}

