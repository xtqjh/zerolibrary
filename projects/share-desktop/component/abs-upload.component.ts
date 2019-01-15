/**
 * @作者: zc
 * @时间: 2018-11-02 10:49:32
 * @描述: 上传类
 */
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UploadXHRArgs } from 'ng-zorro-antd';
import { map, switchMap, filter } from 'rxjs/operators';
import { Result, ConfigService } from '../core';

export class AbsUploadComponet {

  private fileapi = `${this.config$.url.fileapi}`;

  constructor(
    protected http$: HttpClient,
    protected config$: ConfigService
  ) {
  }

  private buildPostData(args: UploadXHRArgs) {
    return this.buildSing$()
      .pipe(
        map((sign: OssUploadSing) => {
          const formData = new FormData();
          const path = sign.key
            + this.random_string(10)
            + this.get_suffix(args.file.name);

          formData.append('OSSAccessKeyId', sign.OSSAccessKeyId);
          formData.append('policy', sign.policy);
          formData.append('signature', sign.signature);
          formData.append('key', path);
          formData.append('success_action_status', '200');

          formData.append('file', args.file as any);

          args.file.url = sign.host + path;

          if (!args.headers) {
            args.headers = {};
          }
          if (args.headers['X-Requested-With'] !== null) {
            args.headers['X-Requested-With'] = `XMLHttpRequest`;
          } else {
            delete args.headers['X-Requested-With'];
          }
          return new HttpRequest('POST', sign.host, formData, {
            reportProgress: true,
            withCredentials: args.withCredentials,
            headers: new HttpHeaders(args.headers)
          });
        }));
  }

  private buildSing$() {
    return this.http$.get(`${this.fileapi}file-disk/signature.json`)
      .pipe(
        filter((res: Result<OssUploadSing>) => res.errCode === 0),
        map((res: Result<OssUploadSing>) => res.content),
      );
  }

  private random_string(len): string {
    len = len || 32;
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  private get_suffix(filename): string {
    const pos = filename.lastIndexOf('.');
    let suffix = '';
    if (pos !== -1) {
      suffix = filename.substring(pos);
    }
    return suffix;
  }

  public uploadRequest = (args: UploadXHRArgs): Subscription => {
    return this.buildPostData(args)
      .pipe(
        switchMap(req => this.http$.request(req))
      )
      .subscribe((event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = event.loaded / event.total * 100;
          }
          args.onProgress(event, args.file);
        } else if (event instanceof HttpResponse) {
          console.log(event);
          args.onSuccess(event.body, args.file, event);
        }
      }, (err) => {
        args.onError(err, args.file);
      });
  }

}


interface OssUploadSing {
  OSSAccessKeyId: string;
  policy: string;
  signature: string;
  key: string;
  dateline: number;
  host: string;
  url: string;
  success_action_status: string;
}
