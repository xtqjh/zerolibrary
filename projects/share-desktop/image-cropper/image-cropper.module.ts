/**
 * @作者: zc
 * @时间: 2018-01-25 11:03:00
 * @描述: 图像裁剪
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ImageCropperModule as icModule } from 'ngx-image-cropper';

import { ImageCropperComponent } from './image-cropper.component';

@NgModule({
  declarations: [ImageCropperComponent],
  exports: [ImageCropperComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    icModule
  ]
})
export class ImageCropperModule { }
