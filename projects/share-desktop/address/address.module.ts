/**
 * @作者: zc
 * @时间: 2019-01-07 16:00:28
 * @描述: 省市区、三级联动
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddressLinkageComponent } from './address-linkage/address-linkage.component';

const COMPONENT = [
  AddressLinkageComponent
];

@NgModule({
  declarations: [...COMPONENT],
  exports: [...COMPONENT],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ]
})
export class AddressModule { }
