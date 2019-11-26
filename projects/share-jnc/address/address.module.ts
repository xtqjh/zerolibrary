/**
 * @作者: zc
 * @时间: 2019-01-07 16:00:28
 * @描述: 省市区、三级联动
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AddressLinkageComponent } from './address-linkage/address-linkage.component';

const COMPONENT = [
  AddressLinkageComponent
];

@NgModule({
  declarations: [...COMPONENT],
  exports: [...COMPONENT],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ]
})
export class AddressModule { }
