/**
 * @作者: changh、zc
 * @时间: 2018-03-15 15:09:31
 * @描述: 放大查看器 · 图片、视频、音频
 */

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

const _all = [
  { name: 'img', type: ['bmp', 'jpg', 'png', 'gif', 'svg', 'psd'] },
  { name: 'video', type: ['mpeg', 'mpg', 'dat', 'mp4', '3GP', 'avi', 'rm'] },
  { name: 'audio', type: ['cd', 'wave', 'aiff', 'mpeg', 'mp3', 'midi', 'wma', 'VQF', 'flac', 'ape', 'aac', 'ogg'] },
  { name: '', type: ['doc', 'docx'] },
  { name: '', type: ['xls', 'xlsx'] },
  { name: '', type: ['ppt', 'pptx'] },
  { name: '', type: ['pdf'] },
  { name: '', type: ['rar', 'zip', '7z', 'gz', 'cab', 'arj', 'lzh', 'ace', 'tar', 'iso'] },
  { name: '', type: ['txt'] }
];

// 文件地址列表
const _fileListUrl = [];

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[player]'
})

export class PlayerDirective {

  constructor(private el: ElementRef) {
    this.setMsgItemClass();
  }

  // 本身检测数据变化
  @Input() set player(condition: any) {
    const then = this;
    const masks = `<div class="ant-modal-mask" style="z-index: 1000;"></div>`;
    const newNode = document.createElement('div');
    newNode.innerHTML = masks;
    newNode.className = 'players';
    const body = document.querySelector('body');
    const els = this.el.nativeElement;

    _fileListUrl.push(condition);

    els.onclick = function () {
      const divBox = document.createElement('div');
      divBox.innerHTML = `<span class='iconfont icon-guanbi3 font-size24 color-fff cur-p colse-mask'
      style='position:absolute;right:30px;top:30px;' id='close' ></span>`;
      divBox.className = 'img-box';
      divBox.id = 'close';

      console.log(_fileListUrl, condition);
      then.flieCreate(divBox, condition);

      newNode.appendChild(divBox);
      body.appendChild(newNode);
    };
  }

  /**
   * 建立组件
   * @param event Event
   * @param _url 文件url
   */
  private flieCreate(event, _url: string) {
    const types = this.flieTypes(_url);
    if (types === 'img') {
      const img = document.createElement('img');
      img.src = _url;
      img.className = 'player-img';
      event.appendChild(img);
    } else if (types === 'video') {
      const video = document.createElement('video');
      video.setAttribute('controls', 'controls');
      video.setAttribute('src', _url);
      video.className = 'player-img';
      event.appendChild(video);
    } else if (types === 'audio') {
      const audio = document.createElement('audio');
      audio.setAttribute('controls', 'controls');
      audio.setAttribute('src', _url);
      audio.className = 'player-img';
      event.appendChild(audio);
    } else {
      const img = document.createElement('img');
      img.src = _url;
      img.className = 'player-img';
      event.appendChild(img);
    }
  }



  /**
   * 关闭
   * @param btn Event
   */
  @HostListener('document:click', ['$event'])
  private onClick(btn: Event) {
    if (btn.target['id'] === 'close') {
      const players = document.querySelector('.players');
      const bodys = document.querySelector('body');
      if (players) {
        bodys.removeChild(players);
      }
      return;
    }
  }

  /**
   * 返回类型
   * 文件url
   */
  private flieTypes(url: string) {
    const types = url.split('.');
    for (const i in _all) {
      if (_all.hasOwnProperty(i)) {
        const element = _all[i];
        const v = element.type.includes(types[types.length - 1]);
        if (v) {
          return element.name;
        }
      }
    }
  }

  private setMsgItemClass() {
    const nod = document.createElement('style');
    const style = `
    .img-box{
      display: flex;
        align-items: center;
        justify-content: center;
      position: fixed;
      overflow: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
    }
    .img-box img,.img-box video,.img-box audio{
      max-height: 80%;
      max-width:80%;
    }
    `;
    nod.type = 'text/css';
    if (nod['styleSheet']) {         // ie下
      nod['styleSheet'].cssText = style;
    } else {
      nod.innerHTML = style;
    }
    document.getElementsByTagName('head')[0].appendChild(nod);
  }

}

