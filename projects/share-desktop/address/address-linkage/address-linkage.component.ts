/**
 * @作者: zc
 * @时间: 2018-08-27 09:41:26
 * @描述: 三级联动选择
 * @使用: <zc-address-linkage (addressChange)="retData($event)"></zc-address-linkage>
 */
import { Component, HostListener, Output, EventEmitter, Input, ChangeDetectionStrategy, ViewEncapsulation, Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { ConfigService } from '../../core/service/config.service';

@Component({
  selector: 'zc-address-linkage',
  templateUrl: './address-linkage.component.html',
  styleUrls: ['./address-linkage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class AddressLinkageComponent {

  // choose : 按钮选择  select : 下拉选择
  @Input() mode = 'select';

  @Output() addressChange: EventEmitter<any> = new EventEmitter<any>();

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
    this.http.get(_url).pipe(
      filter(v => v['errCode'] === 0),
      map(v => v['content'])
    ).subscribe(v => {
      switch (_type) {
        case 'province':
          this.provinceIsLoading = false;
          this.provinceList = v;
          this.cityList = [];
          this.areaList = [];
          break;
        case 'city':
          this.cityIsLoading = false;
          this.cityList = v;
          this.areaList = [];
          break;
        case 'area':
          this.areaIsLoading = false;
          this.areaList = v;
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
    this.addressChange.emit(this.selectList);
  }

  // 市选中
  public cityChange(_item) {
    this.selectFalse(this.cityList);
    _item.select = !_item.select;
    this.areaIsLoading = true;
    this.getAddress(_item['code'], 'area');
    this.areaList = [];
    this.selectItem();
    this.addressChange.emit(this.selectList);
  }

  // 区选中
  public areaChange(_item) {
    this.selectFalse(this.areaList);
    _item.select = !_item.select;
    this.isSelect = false;
    this.selectItem();
    this.addressChange.emit(this.selectList);
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
    const p = this.provinceList.find(v => v.select === true);
    const c = this.cityList.find(v => v.select === true);
    const a = this.areaList.find(v => v.select === true);
    if (p) { this.selectList[0] = p; }
    if (c) { this.selectList[1] = c; }
    if (a) { this.selectList[2] = a; }
  }


}
