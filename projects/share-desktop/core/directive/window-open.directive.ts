/**
 * @作者: zc
 * @时间: 2018-07-06 14:30:54
 * @描述: 干啥呢？
 * @使用: <a [options]="{width:900,minWidth:900}" routerLink="/url/all/list" target="_blank">打开窗体</a>
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { WindowsService } from 'jsw-electron-sdk';
import { ConfigService } from '../service/config.service';
import { isGuid } from '../tools/string';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[target]'
})
export class WindowOpenDirective {

  constructor(
    private el: ElementRef,
    private config: ConfigService
  ) {
  }

  @Input() options: any;

  @HostListener('click', ['$event'])
  onClick(ev: Event) {
    console.log(ev);
    ev.preventDefault(); // 阻止浏览器默认动作 (页面跳转)
    if (ev.target['tagName'] === 'A') {
      console.log(this.options);
      // window.open(ev.target['href']);
      const url = ev.target['href'];
      console.log(url);
      WindowsService.open(url, isGuid(8), this.options || {});
    }
  }

}
