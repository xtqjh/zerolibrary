/**
 * @作者: zc
 * @时间: 2019-01-07 15:59:51
 * @描述: 地图选点
 * @使用: <zc-map-baidu-position-point [ngModel]="address" (ngModelChange)="retData($event)"></zc-map-baidu-position-point>
 * @注意: address:{ longitude: any, latitude: any, address?: string }
 */
import {
  Component, OnInit, OnDestroy, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, forwardRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare const BMap: any;
declare const BMAP_ANCHOR_TOP_RIGHT: any;
declare const BMAP_NAVIGATION_CONTROL_SMALL: any;
declare const BMAP_STATUS_SUCCESS: any;

@Component({
  selector: 'zc-map-baidu-position-point',
  templateUrl: './map-baidu-position-point.component.html',
  styleUrls: ['./map-baidu-position-point.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapBaiduPositionPointComponent),
      multi: true
    }
  ],
})
export class MapBaiduPositionPointComponent implements ControlValueAccessor {

  item: any;

  keyVal = '';

  keySearchVal = [];

  options: any = {};

  address: Observable<any>;

  private _map: any;

  private _circle: any;

  private _marker: any;

  private _point: { longitude: any, latitude: any, address?: string };

  /**
   * 是否展开地址列表
   */
  isAddressOff = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    setInterval(() => {
      this.cdr.markForCheck();
    }, 1000);
  }

  writeValue(value: { longitude: any, latitude: any, address: string }) {
    if (value) { this._point = value; }
  }
  private markForCheck() {
    this.cdr.markForCheck();
    // tslint:disable-next-line:no-unused-expression
    this.onChange && this.onChange(this.item);
  }
  onChange = (_: any) => { };
  // 设置当控件接收到change事件后，调用的函数
  registerOnChange(fn: any): void { this.onChange = fn; }
  onTouched = () => { };
  // 设置当控件接收到touched事件后，调用的函数
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }


  /**
   * 地图初始化
   */
  onReady(map: any) {
    this._map = map;
    if (this._point && this._point.longitude && this._point.latitude) {
      map.centerAndZoom(new BMap.Point(this._point.longitude, this._point.latitude), 16);
    } else {
      map.centerAndZoom(new BMap.Point(104.072224, 30.664599), 16);
    }
    map.enableScrollWheelZoom();

    // 右上角，仅包含平移和缩放按钮
    const top_right_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL });
    map.addControl(top_right_navigation);

    if (this._point && this._point.longitude && this._point.latitude) {
      const geoc = new BMap.Geocoder();
      geoc.getLocation(new BMap.Point(this._point.longitude, this._point.latitude), (rs) => {
        // console.log(rs.addressComponents);
        this._cneter({ name: `${rs.addressComponents.province}${rs.addressComponents.city}${rs.addressComponents.distric}${rs.addressComponents.stree}${rs.addressComponents.streetNumbe}` });
      });
    } else {
      const myCity = new BMap.LocalCity();
      myCity.get(this._cneter.bind(this));
    }
  }

  private onAutocomplete(key) {
    const then = this;
    const local = new BMap.LocalSearch(this._map, {
      onSearchComplete: function (results) {
        if (local.getStatus() === BMAP_STATUS_SUCCESS) {
          // 判断状态是否正确
          const s = [];
          for (let i = 0; i < (results.getCurrentNumPois() > 4 ? 4 : results.getCurrentNumPois()); i++) {
            s.push(results.getPoi(i));
          }
          then.keySearchVal = s;
          console.log(then.keySearchVal);
        }
      }
    });
    local.search(key);
  }

  keySearch(el) {
    this.onAutocomplete(el);
  }

  nicheRef(el) {
    this.keySearchVal = [];
    this.keyVal = '';

    this._map.clearOverlays();
    el['name'] = el.point;
    this._cneter(el);
    this.address = this._loadLocation(el.point);
    this._setAddress();
  }


  /**
   * 设置地图标点
   */
  private _cneter(rl) {
    this._map.setCenter(rl.name);

    setTimeout(() => {
      const center = this._map.getCenter();
      const point = new BMap.Point(center.lng, center.lat);
      const marker = this._marker = new BMap.Marker(point); // 创建标注
      this._map.addOverlay(marker);       // 将标注添加到地图中
      marker.enableDragging();            // 可拖拽

      this._map.setCenter(point);

      // 绑定事件 - 拖拽中
      marker.addEventListener('dragging', (res) => {
        this._map.removeOverlay(this._circle);
      });

      // 绑定事件 - 停止拖拽
      marker.addEventListener('dragend', (res) => {
        this.address = this._loadLocation(res.point);
        this._setAddress();
      });

      setTimeout(() => {
        this.address = this._loadLocation(point);
        this._setAddress();
      }, 500);

    }, 600);
  }

  /**
   * 选中地点
   */
  private _setAddress() {
    this.address.subscribe(res => {
      this.item = Object.assign({}, this.item, {
        placeName: res.surroundingPois[0].title,
        latitude: res.surroundingPois[0].point.lat,
        longitude: res.surroundingPois[0].point.lng,
        address: res.surroundingPois[0].address,
        addressComponents: res.addressComponents,
        business: res.business,
      });
      this.markForCheck();
    });
  }

  /**
   * 位置解析
   */
  private _loadLocation(_point_): Observable<any> {
    return new Observable((res) => {
      new BMap.Geocoder().getLocation(_point_, function (rs) {
        res.next(rs);
      }, { poiRadius: 200, numPois: 15 });
    });
  }

  /**
   * 设置选中位置
   */
  clickAddress(item) {
    this.item = Object.assign({}, this.item, {
      placeName: item.title,
      latitude: item.point.lat,
      longitude: item.point.lng,
      address: item.address
    });
    this.isAddressOff = false;
    this.markForCheck();
  }

  /**
   * 范围参数变化
   */
  rangeChange(event) {
    this._map.removeOverlay(this._circle);
    const point = new BMap.Point(this.item.longitude, this.item.latitude);
  }

}
