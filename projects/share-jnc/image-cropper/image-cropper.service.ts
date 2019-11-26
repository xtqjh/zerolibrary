import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Result, ConfigService } from '../core/service/config.service';


@Injectable({
  providedIn: 'root'
})
export class ImageCropperService {

  private url$ = `${this.pages.url.fileapi}`;

  constructor(
    private http: HttpClient,
    private pages: ConfigService
  ) { }


  /**
   * OSS文件上传
   * @param file 文件
   * @param folderName 文件夹模块名称
   */
  public uploadOSS(file: File, folderName: string) {
    return this.getSignature().pipe(
      map(res => {
        const url = res['host'];
        const key = res['key'];
        const formData = new FormData();
        for (const keys in res) {
          if (keys !== 'key' && keys !== 'url' && keys !== 'host') {
            formData.append(keys, res[keys]);
          }
        }
        const _fileSrc = `${key}${folderName}/${new Date().getFullYear()}-${new Date().getMonth() + 1}/${new Date().getDate()}/${this.hashName(file.name)}`;
        formData.append('url', url);
        formData.append('key', _fileSrc);
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        // 状态
        xhr.onreadystatechange = () => {
          return of({ fileUrl: url + _fileSrc, data: xhr });
        };
        xhr.open('POST', url, true);
        xhr.send(formData);
        return { fileUrl: url + _fileSrc, data: xhr };
      })
    );
  }


  /**
   * OSS签名
   */
  public getSignature() {
    const _headers = new HttpHeaders()
      .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
      .set('X-Requested-With', 'XMLHttpRequest');
    const url = `${this.url$}file-disk/signature.json`;
    return this.http.get<Result<any>>(url, { headers: _headers }).pipe(
      filter((v: Result<any>) => v.errCode === 0),
      map((v: Result<any>) => v.content)
    );
  }


  /**
   * hash名称
   * @param fileName 名称
   */
  private hashName(fileName: string) {
    let guid = '';
    for (let i = 1; i <= 16; i++) {
      const n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
    }
    const name = fileName.split('.')[fileName.split('.').length - 1];
    return guid + '.' + name;
  }
}
