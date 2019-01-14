/**
 * @作者: zc
 * @时间: 2018-09-30 13:17:41
 * @描述: 组织架构
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { RangeVisibleModalComponent } from './range-visible-modal/range-visible-modal.component';

@NgModule({
  declarations: [RangeVisibleModalComponent],
  exports: [RangeVisibleModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    MalihuScrollbarModule.forRoot()
  ]
})
export class OrganizationStructureModule { }
