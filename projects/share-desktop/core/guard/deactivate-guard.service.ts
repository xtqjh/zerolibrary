/**
 * @作者: zc
 * @时间: 2018-01-23 18:02:56
 * @描述: 路由守卫 · 离开路由前
 * canDeactivate: [DeactivateGuardService]
 */
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

//
// 路由守卫
//
// 需要在路由中添加属性 canDeactivate: [DeactivateGuardService]
// 在在对应的控制器中加入 canDeactivate(): Observable<boolean> | boolean {}
//
// 使用方法：
// 1、在路由上添加 {path: "...", component: ..., canDeactivate: [DeactivateGuardService] }
// 2、在对应的控制器里 canDeactivate(): Observable<Boolean> | boolean { return boolean; }


export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class DeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
