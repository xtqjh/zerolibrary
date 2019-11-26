import { Injectable, Inject } from '@angular/core';

declare const document: any;



export class AbmConfig {
  /**
   * APP KEY 必填项
   */
  apiKey?: string;

  /**
   * 默认：api.map.baidu.com/api
   */
  apiHostAndPath?: string;

  /**
   * API异步加载回调函数名
   */
  apiCallback?: string;

  /**
   * API版本号，默认：3.0
   */
  apiVersion?: string;

  /**
   * API 请求协议
   */
  apiProtocol?: 'http' | 'https' | 'auto';

  /**
   * 默认地图配置项，等同于[MapOptions 对象规范](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a0b1)
   */
  mapOptions?: any;

  /**
   * 默认全景配置项，等同于[PanoramaOptions 对象规范](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a8b1)
   */
  panoramaOptions?: any;
}




@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _scriptLoadingPromise: Promise<void>;
  public cog: any;
  // @Inject('AbmConfig') public cog: AbmConfig
  constructor() {
    this.cog = {
      apiKey: 'qOz9QmXd4l6hAOY4SFAUst4P',
      apiProtocol: 'auto',
      apiVersion: '3.0',
      apiCallback: 'angularBaiduMapsLoader',
      apiHostAndPath: 'api.map.baidu.com/api'
    };
  }

  load(): Promise<void> {
    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = this._getSrc();

    this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {

      (<any>window)[this.cog.apiCallback] = () => { resolve(); };

      script.onerror = (error: Event) => { reject(error); };
    });

    document.body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  private _getSrc(): string {
    let protocol: string;
    switch (this.cog.apiProtocol) {
      case 'http':
        protocol = 'http:';
        break;
      case 'https':
        protocol = 'https:';
        break;
      default:
        protocol = '';
        break;
    }
    const queryParams: { [key: string]: string | string[] } = {
      v: this.cog.apiVersion,
      ak: this.cog.apiKey,
      callback: this.cog.apiCallback
    };
    const params: string =
      Object.keys(queryParams)
        .filter((k: string) => queryParams[k] != null)
        .filter((k: string) => {
          return !Array.isArray(queryParams[k]) || (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
        .map((k: string) => {
          const i = queryParams[k];
          if (Array.isArray(i)) { return { key: k, value: i.join(',') }; }
          return { key: k, value: i };
        })
        .map((entry: { key: string, value: string }) => `${entry.key}=${entry.value}`)
        .join('&');
    return `${protocol}//${this.cog.apiHostAndPath}?${params}`;
  }
}


