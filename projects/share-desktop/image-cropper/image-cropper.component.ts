/**
 * @作者: zc
 * @时间: 2019-01-08 10:27:16
 * @描述: 图像裁剪
 * @使用: <zc-image-cropper [(isVisible)]="isVisibleCro"
 *          [resizeToWidth]="icWidht"
 *          [aspectRatio]="icRatio"
 *          [folderName]="folderName"
 *          (retImage)="retImage($event)">
 *        </zc-image-cropper>
 *
 *        // 图像裁剪
 *        isVisibleCro = false;
 *        // 尺寸宽度，单位 px
 *        icWidht = 100;
 *        // 比例
 *        icRatio = 1 / 1;
 *        // 文件夹模块名称
 *        folderName = 'formTemplate';
 */
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MessagesService, ConfigService, Result, isClone, convertBase64UrlToBlob, isGuid } from '../core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'zc-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class ImageCropperComponent implements OnInit {

  @Input() isVisible: Boolean = false;
  @Output() isVisibleChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Input() resizeToWidth = 100;

  @Input() aspectRatio = 1 / 1;

  @Input() folderName = 'default';

  @Output() retImage: EventEmitter<any> = new EventEmitter<any>();

  public imageChangedEvent = '';
  public croppedImage = '';

  public isRepeatClick = false;

  private getoss$: any;

  private url$ = `${this.pages.url.fileapi}`;

  constructor(
    private msg: MessagesService,
    private http: HttpClient,
    private pages: ConfigService
  ) { }

  ngOnInit() {
    this.imageChangedEvent = '';
    this.croppedImage = '';
  }

  public imageLoaded() {
    console.log('imageLoaded');
  }
  public loadImageFailed() {
    console.log('loadImageFailed');
  }

  // 绑定选择文件
  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  // 裁剪后的图像
  public imageCropped(image: string) {
    this.croppedImage = image;
  }


  /**
   * OSS文件上传
   * @param file 文件
   * @param folderName 文件夹模块名称
   */
  private uploadOSS(file: File, folderName: string) {
    return this.getSignature().pipe(
      map(res => {
        const url = res['host'];
        const key = res['key'];
        const formData = new FormData();
        for (const keys in res) {
          if (keys !== 'key' && keys !== 'url' && keys !== 'host') {
            formData.append(keys, res[keys]);
          }
        }
        const _fileSrc = `${key}${folderName}/${new Date().getFullYear()}-${new Date().getMonth() + 1}/${new Date().getDate()}/${this.hashName(file.name)}`;
        formData.append('url', url);
        formData.append('key', _fileSrc);
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        // 状态
        xhr.onreadystatechange = () => {
          return of({ fileUrl: url + _fileSrc, data: xhr });
        };
        xhr.open('POST', url, true);
        xhr.send(formData);
        return { fileUrl: url + _fileSrc, data: xhr };
      })
    );
  }


  /**
   * OSS签名
   */
  private getSignature() {
    const url = `${this.url$}file-disk/signature.json`;
    return this.http.get(url).pipe(
      filter((v: Result<any>) => v.errCode === 0),
      map((v: Result<any>) => v.content)
    );
  }


  /**
   * hash名称
   * @param fileName 名称
   */
  private hashName(fileName: string) {
    let guid = '';
    for (let i = 1; i <= 16; i++) {
      const n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
    }
    const name = fileName.split('.')[fileName.split('.').length - 1];
    return guid + '.' + name;
  }

  // 图像格式化
  private formatImage() {
    return {
      base64: isClone(this.croppedImage),
      files: new File([convertBase64UrlToBlob(this.croppedImage)], `${isGuid(16)}.png`)
    };
  }

  /**
   * 确定按钮
   */
  public handleOk() {
    if (this.croppedImage) {
      const images = this.formatImage();
      this.isRepeatClick = true;
      if (this.getoss$) { this.getoss$.unsubscribe(); }
      this.getoss$ = this.uploadOSS(images.files, this.folderName).subscribe(res => {
        res.data.onreadystatechange = (event) => {
          if (event.target['readyState'] === 4) {
            images['fileurl'] = res.fileUrl;
            this.isVisible = false;
            this.isRepeatClick = false;
            this.isVisibleChange.emit(this.isVisible);
            this.retImage.emit(images);
          }
        };
      });
    } else {
      this.msg.warning('请先选择图片');
    }
  }

  /**
   * 取消按钮
   */
  public handleCancel() {
    if (this.getoss$) { this.getoss$.unsubscribe(); }
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

}
