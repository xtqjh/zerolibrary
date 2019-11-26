/**
 * @作者: zc
 * @时间: 2018-12-25 11:29:12
 * @描述: 缩放
 */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[zcScaling]'
})
export class ScalingDirective {

  constructor(private el: ElementRef) { }

  // 监听document鼠标滚轮
  @HostListener('mousewheel', ['$event']) onDOMMouseScroll(event) {
    const scale = this.el.nativeElement.style.transform.substring(6).split(')');
    let old_n = Number(scale[0]);
    if (event.wheelDelta > 0) {
      old_n = old_n + 0.02;
    } else {
      old_n = old_n - 0.02;
    }
    this.el.nativeElement.style.transform = `scale(${old_n})`;
  }


}
