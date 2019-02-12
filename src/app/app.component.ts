import { Component, ChangeDetectorRef } from '@angular/core';
import { MalihuScrollbarComponent } from 'ng-share-desktop';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  dynForm: FormGroup = this.fb.group({
    input: [null, Validators.required],
    // address: [
    //   [
    //     { code: '510', title: '四川省' },
    //     // { code: '510100000000', title: '成都市' },
    //     // { code: '510106000000', title: '金牛区' }
    //   ], [Validators.required]
    // ]
    address: [this.fb.array([]), [Validators.required]],
    flowId: 3329
  });

  constructor(
    changeDetectorRef$: ChangeDetectorRef,
    mScrollbarService$: MalihuScrollbarService,
    private fb: FormBuilder
  ) {
    super(changeDetectorRef$, mScrollbarService$);
  }

  public retData(event) {
    console.log(event);
  }

  public handleOk() {
    for (const i in this.dynForm.controls) {
      if (this.dynForm.controls.hasOwnProperty(i)) {
        this.dynForm.controls[i].markAsDirty();
        this.dynForm.controls[i].updateValueAndValidity();
      }
    }
    console.log(this.dynForm.value);
  }

}
