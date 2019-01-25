/**
 * @作者: zc
 * @时间: 2018-07-20 19:53:25
 * @描述: 模板名称与图标设置
 */
import { Component, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Parameter } from '../form-template.service';

@Component({
  selector: 'zc-form-template-alter',
  templateUrl: './form-template-alter.component.html',
  styleUrls: ['../form-template.component.css']
})
export class FormTemplateAlterComponent {

  @Input() parameter: Parameter;

  @Input() item: any;

  @Output() resItemChange: EventEmitter<any> = new EventEmitter<any>();

  tempaddimg: Boolean = false;

  @ViewChild('tempLeftWkimg') tempLeftWkimg;

  // 图像裁剪
  isVisibleCro = false;
  icWidht = 100;
  icRatio = 1 / 1;



  /**
   * 接收图像裁剪
   */
  public retImage(event) {
    console.log(event);
    this.item.icon = event.fileurl;
    this.setResItemChange();
  }

  // 不在使用备选图标，使用自定义上传图标
  openBox() {
    this.tempaddimg = !this.tempaddimg;
    setTimeout(() => {
      this.tempLeftWkimg.nativeElement.focus();
    }, 500);
  }

  setResItemChange() {
    this.resItemChange.emit({ name: this.item.name, icon: this.item.icon });
  }

}
