import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WebSocketService {

  ws: WebSocket;

  constructor() { }

  /**
   * 根据传入的url创建一个websocket协议
   */
  createObservableScoket(url: string): Observable<any> {
    // 创建websocket服务
    this.ws = new WebSocket(url);
    // this.ws.onopen = event => console.log(event);
    return new Observable(observer => {
      // 返回成功时执行的方法
      this.ws.onmessage = event => observer.next(event.data);
      // 返回错误时执行的方法
      this.ws.onerror = event => observer.error(event);
      // 关闭websocket流时执行的方法
      this.ws.onclose = event => observer.complete();
    });
  }

  /**
   * 关闭
   */
  closeScoket() {
    if (this.ws) { this.ws.close(); }
  }

  /**
   * 发送消息
   */
  sendMessage(msg: string) {
    this.ws.send(msg);
  }
}
