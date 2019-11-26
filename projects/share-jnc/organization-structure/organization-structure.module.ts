/**
 * @作者: zc
 * @时间: 2018-09-30 13:17:41
 * @描述: 组织架构
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { HttpClientModule } from '@angular/common/http';

import { OrganizationStructureComponent } from './organization-structure.component';

@NgModule({
  declarations: [OrganizationStructureComponent],
  exports: [OrganizationStructureComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgZorroAntdModule,
    MalihuScrollbarModule.forRoot()
  ]
})
export class OrganizationStructureModule { }
