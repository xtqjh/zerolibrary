import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { ConfigService, Result } from '../core/service/config.service';
import { MessagesService } from '../core/service/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ApprovalFlowService {

  private custom = `${this.config.url.custom}`;

  private _headers = new HttpHeaders()
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('X-Requested-With', 'XMLHttpRequest');

  constructor(
    private msg: MessagesService,
    private http: HttpClient,
    private config: ConfigService
  ) {

  }

  loadFlow$(flowId: number) {
    return this.http.get(`${this.custom}oa/flow/${flowId}/config?withStaff=true`, { headers: this._headers })
      .pipe(
        filter((v: Result<any>) => {
          v.errCode === 0 ? console.log(v) : this.msg.error(v.msg || 'api error');
          return v.errCode === 0;
        }),
        map((v: Result<any>) => v.content)
      );
  }


}
