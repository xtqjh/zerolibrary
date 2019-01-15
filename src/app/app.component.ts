import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isVisible = false;

  map = {
    longitude: 106.486654,
    latitude: 29.490295
  };

  // 图像裁剪
  isVisibleCro = false;
  // 尺寸宽度，单位 px
  icWidht = 100;
  // 比例
  icRatio = 1 / 1;
  // 文件夹模块名称
  folderName = 'formTemplate';

  viewRanges = [];

  flowId = 3081;

  public retData(event) {
    console.log(event);
  }

}
