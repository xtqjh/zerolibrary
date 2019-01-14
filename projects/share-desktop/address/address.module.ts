/**
 * @作者: zc
 * @时间: 2019-01-07 16:00:28
 * @描述: 省市区、三级联动
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { LinkageComponent } from './linkage/linkage.component';
import { MapBaiduModule } from '../map-baidu/map-baidu.module';

const COMPONENT = [
  LinkageComponent
];

@NgModule({
  declarations: [COMPONENT],
  exports: [COMPONENT],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    MapBaiduModule
  ]
})
export class AddressModule { }
