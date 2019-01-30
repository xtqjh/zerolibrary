/**
 * @作者: zc 、 awangsw
 * @时间: 2019-01-30 09:34:12
 * @描述: 三级联动选择
 * @使用: <zc-address-linkage [ngModel]="address" (ngModelChange)="retData($event)"></zc-address-linkage>
 */
import { Component, HostListener, Output, EventEmitter, Input, ChangeDetectionStrategy, ViewEncapsulation, Injectable, ChangeDetectorRef, forwardRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { ConfigService } from '../../core/service/config.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Result } from 'share-desktop/core';
import { BehaviorSubject } from 'rxjs';

export interface InitLinkage {
  code: string;
  title: string;
}

@Component({
  selector: 'zc-address-linkage',
  templateUrl: './address-linkage.component.html',
  styleUrls: ['./address-linkage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressLinkageComponent),
    multi: true
  }]
})
export class AddressLinkageComponent implements ControlValueAccessor {

  // choose : 按钮选择  select : 下拉选择
  @Input() mode = 'select';

  private address = `${this.config.url.address}`;

  // 选中de对象
  selectList = [];

  // 是否展开选项
  isSelect = false;

  // 省
  provinceList = [];
  provinceIsLoading = false;
  // 市
  cityList = [];
  cityIsLoading = false;
  // 区
  areaList = [];
  areaIsLoading = false;

  // 是否选择完成
  selectDoneSub = new BehaviorSubject('');
  initAddress = {
    province: false,
    city: false,
    area: false
  };

  onChange: (value: any) => void = () => null;

  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.provinceIsLoading = true;
    this.getAddress(1, 'province');
  }

  private markForCheck() {
    this.cdr.markForCheck();
    console.log(this.selectList);
    this.onChange(this.selectList);
  }

  writeValue(obj: InitLinkage[]): void {
    if (Array.isArray(obj) && obj.length > 0) {
      if (obj.length > 0) { this.initAddress.province = true; }
      if (obj.length > 1) { this.initAddress.city = true; }
      if (obj.length > 2) { this.initAddress.area = true; }

      const selectSub$ = this.selectDoneSub.asObservable();
      selectSub$.subscribe((type) => {
        if (type === 'province' && obj.length > 0) {
          const provinceCode = obj[0].code;
          const proviceObj = this.provinceList.find(item => String(item.code) === String(provinceCode));
          if (proviceObj) { this.provinceChange(proviceObj); }
        } else if (type === 'city' && obj.length > 1) {
          const cityCode = obj[1].code;
          const cityObj = this.cityList.find(item => String(item.code) === String(cityCode));
          if (cityObj) { this.cityChange(cityObj); }
        } else if (type === 'area' && obj.length > 2) {
          const areaCode = obj[2].code;
          const areaObj = this.areaList.find(item => String(item.code) === String(areaCode));
          if (areaObj) { this.areaChange(areaObj); }
        } else {
          console.log(type);
        }
      });
    } else {
      this.provinceList = [];
      this.cityList = [];
      this.areaList = [];
      this.selectList = [];
      this.provinceIsLoading = true;
      this.initAddress.province = true;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(value: any) {
    // console.log(value);
  }

  @HostListener('click', ['$event'])
  onClick(ev: Event) {
    switch (ev.target['id']) {
      case 'zc-linkage-picker-label':
        this.isSelect = true;
        break;
      case 'zc-input':
        this.isSelect = true;
        break;
      case 'zc-overlay-backdrop':
        this.isSelect = false;
        break;
      default:
        break;
    }
  }

  // 获取地址列表
  private getAddress(_code, _type) {
    const _url = `${this.address}address-area?parentCode=${_code}`;
    const _headers = new HttpHeaders()
      .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
      .set('X-Requested-With', 'XMLHttpRequest');
    this.http.get(_url, { headers: _headers }).pipe(
      filter((v: Result<any>) => v.errCode === 0),
      map((v: Result<any>) => v.content)
    ).subscribe(v => {
      switch (_type) {
        case 'province':
          this.provinceIsLoading = false;
          this.provinceList = v;
          this.cityList = [];
          this.areaList = [];
          if (this.initAddress.province) {
            this.initAddress.province = false;
            this.selectDoneSub.next('province');
          }
          break;
        case 'city':
          this.cityIsLoading = false;
          this.cityList = v;
          this.areaList = [];
          if (this.initAddress.city) {
            this.initAddress.city = false;
            this.selectDoneSub.next('city');
          }
          break;
        case 'area':
          this.areaIsLoading = false;
          this.areaList = v;
          if (this.initAddress.area) {
            this.initAddress.area = false;
            this.selectDoneSub.next('area');
          }
          break;
        default:
          break;
      }
      this.markForCheck();
    });
  }

  // 省选中
  public provinceChange(_item) {
    this.selectFalse(this.provinceList);
    _item.select = !_item.select;
    this.cityIsLoading = true;
    this.getAddress(_item['code'], 'city');
    this.cityList = [];
    this.areaList = [];
    this.selectItem();
    this.markForCheck();
  }

  // 市选中
  public cityChange(_item) {
    this.selectFalse(this.cityList);
    _item.select = !_item.select;
    this.areaIsLoading = true;
    this.getAddress(_item['code'], 'area');
    this.areaList = [];
    this.selectItem();
    this.markForCheck();
  }

  // 区选中
  public areaChange(_item) {
    this.selectFalse(this.areaList);
    _item.select = !_item.select;
    this.isSelect = false;
    this.selectItem();
    this.markForCheck();
  }

  // 取消选中
  private selectFalse(_list) {
    this.selectList = [];
    _list.forEach(element => {
      element.select = false;
    });
  }

  // 获取选中
  private selectItem() {
    // debugger
    const p = this.provinceList.find(v => v.select === true);
    const c = this.cityList.find(v => v.select === true);
    const a = this.areaList.find(v => v.select === true);
    if (p) { this.selectList[0] = p; }
    if (c) { this.selectList[1] = c; }
    if (a) { this.selectList[2] = a; }
  }


}
