/**
 * @作者: zc
 * @时间: 2018-01-23 11:55:19
 * @描述: 渠道翻译（英文名转中文名）
 */
import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, tap } from 'rxjs/operators';
import { ConfigService, Result } from '../core/service/config.service';

@Pipe({
  name: 'channel'
})
export class ChannelPipe implements PipeTransform {

  private custom = `${this.config.url.custom}`;

  channels: Array<any>;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.getChannels();
  }

  transform(value: any): any {
    for (const i in this.channels) {
      if (this.channels.hasOwnProperty(i)) {
        const element = this.channels[i];
        if (element.channelEnName === value) {
          return element.name;
        }
      }
    }
  }

  /**
   * 系统所有渠道（码表）
   */
  getChannels() {
    const json = localStorage.getItem('zc_cache_channels');
    if (json) {
      this.channels = JSON.parse(json);
      return;
    } else {
      this.http.get(`${this.custom}channels`)
        .pipe(
          filter((v: Result<any>) => v.errCode === 0),
          map((v: Result<any>) => v.content),
          tap(res => localStorage.setItem('zc_cache_channels', JSON.stringify(res)))
        ).subscribe(res => this.channels = res);
    }
  }

}
