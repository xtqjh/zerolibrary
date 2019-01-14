/**
 * @作者: zc
 * @时间: 2019-01-08 11:16:08
 * @描述: 干啥呢？
 * @使用: <zc-map-baidu #map
 *          [options]="options"
 *          (ready)="retData($event)"
 *          style="height:100%;width:100%;">
 *       </zc-map-baidu>
 *
 *       // 地图配置参数
 *       options = {
 *          enableMapClick: false
 *       };
 */
import { Component, Input, OnDestroy, Output, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ElementRef, EventEmitter, NgZone, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LoaderService, AbmConfig } from './loader.service';

declare const BMap: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'zc-map-baidu',
  template: ``,
  styles: [`.angular-baidu-maps-container { display:block; width:100%; height:100%; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [LoaderService, AbmConfig]
})
export class MapBaiduComponent implements OnChanges, OnDestroy {

  @Input() options: any = {};
  @Output() ready = new EventEmitter<any>();

  private map: any = null;

  constructor(
    private el: ElementRef,
    private COG: AbmConfig,
    private loader: LoaderService,
    private zone: NgZone
  ) {

    this._initMap();
  }



  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) { this._updateOptions(); }
  }

  private _initMap() {
    if (this.map) { return; }
    this.loader.load().then(() => {
      this.zone.runOutsideAngular(() => {
        try {
          this.map = new BMap.Map(this.el.nativeElement, this.options);
        } catch (ex) {
          console.warn('地图初始化失败', ex);
        }
      });
      this.ready.emit(this.map);
    }).catch((error: Error) => {
      console.warn('js加载失败', error);
    });
  }

  private _updateOptions() {
    this.options = Object.assign({}, this.COG.mapOptions, this.options);
    if (this.map) {
      this.map.setOptions(this.options);
    }
  }

  private destroy() {
    if (this.map) {
      this.map.clearOverlays();
      this.map.clearHotspots();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}
