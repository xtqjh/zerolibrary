import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import {GatewayUrl, OauthService, UserToken} from 'jsw-electron-sdk';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: UserToken;

  constructor() {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return from(OauthService.token())
      .pipe(switchMap((t: UserToken) => {
        localStorage.setItem('access_token', t.access_token);
        let _headers = new HttpHeaders()
          .set('Authorization', 'bearer ' + t.access_token)
          .set('X-Requested-With', 'XMLHttpRequest');

        req.headers.keys().forEach(item => {
          _headers = _headers.set(item, req.headers.get(item));
        });
        const authReq = req.clone({
          headers: _headers,
          url: (req.url.startsWith('/') ? GatewayUrl : '') + req.url
        });

        return next.handle(authReq);
      }));


  }
}
