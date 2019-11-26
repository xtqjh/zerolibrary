/**
 * @作者: zc
 * @时间: 2018-01-23 18:12:56
 * @描述: 路由守卫 · 进入路由前
 * canActivate: [SafeguardGuardService],
 */
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class SafeguardGuardService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    console.log('进入前路由A：', url, route, this.router, this.route);
    return this.safeguard(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    console.log('进入前路由B：', url, route, this.router, this.route);
    return this.safeguard(url);
  }

  safeguard(url: string): boolean {
    if (sessionStorage.getItem(url)) { return true; }
    this.router.navigate([`/safeguard/${url}`]);
    return false;
  }

}
