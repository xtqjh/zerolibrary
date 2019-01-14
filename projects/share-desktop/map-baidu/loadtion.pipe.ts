import { Pipe, PipeTransform } from '@angular/core';

// 地图定位使用
// 返回附近POI列表

@Pipe({
  name: 'loadtion'
})
export class LoadtionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) { return null; }
    return value.surroundingPois;
  }

}
