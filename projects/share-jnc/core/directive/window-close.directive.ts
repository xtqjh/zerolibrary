/**
 * @作者: zc
 * @时间: 2018-07-06 14:30:16
 * @描述: 关闭
 * @使用: <a class="zd-btn zd-btn-default" close>取消</a>
 */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[close]'
})
export class WindowCloseDirective {

  constructor(
    private el: ElementRef,
  ) {
  }

  @HostListener('click', ['$event'])
  onClick(ev: Event) {
    ev.preventDefault(); // 阻止浏览器默认动作 (页面跳转)
    window.close();
  }

}
