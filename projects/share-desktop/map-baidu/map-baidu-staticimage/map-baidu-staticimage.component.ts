/**
 * @作者: zc
 * @时间: 2018-01-26 11:59:11
 * @描述: 静态图
 * @使用: <zc-map-baidu-staticimage
 *          [longitude]="longitude"
 *          [latitude]="latitude"
 *          [width]="250"
 *          [height]="130"
 *          [zoom]="14">
 *       </zc-map-baidu-staticimage>
 */
import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { AbmConfig, LoaderService } from '../loader.service';

@Component({
  selector: 'zc-map-baidu-staticimage',
  templateUrl: './map-baidu-staticimage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
})
export class MapBaiduStaticimageComponent implements OnInit, OnChanges {

  @Input() longitude: any = '116.403874';
  @Input() latitude: any = '39.914888';
  @Input() width: Number = 200;
  @Input() height: Number = 200;
  @Input() zoom: Number = 12;

  mapImage = '';

  constructor(private COG: LoaderService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['longitude'] || changes['latitude'] || changes['width'] || changes['height'] || changes['zoom']) {
      this.isAssemble();
    }
  }

  isAssemble() {
    const pages = {
      ak: this.COG.cog.apiKey,
      mcode: 666666,
      center: `${this.longitude},${this.latitude}`,
      width: this.width,
      height: this.height,
      zoom: this.zoom,
      markers: `${this.longitude},${this.latitude}`
    };
    const parmas = '?' + this.formatGetUrl(pages);
    this.mapImage = `http://api.map.baidu.com/staticimage/v2${parmas}`;
  }


  /**
   * 对象格式化拼接
   * @param data [对象 eg:{a:'a',b:'b',c:1}]
   * return a=a&b=b&c=1
   */
  public formatGetUrl(data: any) {
    let ret = '';
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        ret = ret.length > 0 ? (ret + '&') : ret;
        ret = ret + i + '=' + data[i];
      }
    }
    return ret;
  }

}
