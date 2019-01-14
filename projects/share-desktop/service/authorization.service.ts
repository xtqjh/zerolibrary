import { Injectable } from '@angular/core';
import {OauthService} from 'jsw-electron-sdk';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  /**
   * 获取 token
   */
  public get getAuthorization() {
    // return sessionStorage.getItem('access_token') || 'c256d682-f01d-4756-aeee-641d161997e5';
    return OauthService.token();
  }

  /**
   * 验证 token 是否超时
   */

  /**
   * 刷新 token
   */

  /**
   * 删除 token
   */

}
