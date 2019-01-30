import { Component, ChangeDetectorRef } from '@angular/core';
import { MalihuScrollbarComponent } from 'ng-share-desktop';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends MalihuScrollbarComponent {

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

  flowId = 3329;

  flowInstanceUuid = '2c931be5673044e70167355223330037';

  scrollbar$ = ['#container'];

  address = [
    { code: '510', title: '四川省' },
    { code: '510100000000', title: '成都市' },
    { code: '510106000000', title: '金牛区' }
  ];

  constructor(
    changeDetectorRef$: ChangeDetectorRef,
    mScrollbarService$: MalihuScrollbarService
  ) {
    super(changeDetectorRef$, mScrollbarService$);
  }

  public retData(event) {
    // console.log(event);
  }

}
