/**
 * @作者: zc
 * @时间: 2018-08-01 14:47:23
 * @描述: 百度地图
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LoadtionPipe } from './loadtion.pipe';
import { MapBaiduComponent } from './map-baidu.component';
import { MapBaiduPositionComponent } from './map-baidu-position/map-baidu-position.component';
import { MapBaiduPositionPointComponent } from './map-baidu-position-point/map-baidu-position-point.component';
import { MapBaiduStaticimageComponent } from './map-baidu-staticimage/map-baidu-staticimage.component';

const COMPONENT = [
  MapBaiduComponent,
  MapBaiduPositionComponent,
  MapBaiduPositionPointComponent,
  MapBaiduStaticimageComponent
];

@NgModule({
  declarations: [...COMPONENT, LoadtionPipe],
  exports: [...COMPONENT, LoadtionPipe],
  imports: [CommonModule, FormsModule, NgZorroAntdModule]
})
export class MapBaiduModule { }


// declarations: [],   // 用到的组件，指令，管道
// providers: [],      // 依赖注入服务
// imports: [],        // 导入需要的模块
// exports: [],        // 导出的模块，跨模块交流
// entryComponents: [] // 需提前编译好的模块
// bootstrap: []       // 设置根组件


