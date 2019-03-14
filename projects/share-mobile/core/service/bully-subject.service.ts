/**
 * @作者: zc
 * @时间: 2018-04-19 10:48:58
 * @描述: 观察者模式·全局
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BullySubjectService {

  private subject$: Subject<Bully>;

  constructor() {
    if (!this.subject$) {
      this.subject$ = new Subject<Bully>();
    }
  }

  /**
   * 观察者模式·接收
   */
  public getSubject(): Observable<Bully> {
    return this.subject$.asObservable();
  }

  /**
   * 观察者模式·发送
   * @param item Object
   */
  public setSubject(item: Bully) {
    this.subject$.next(item);
  }

}

export interface Bully {
  type: string;
  data: any;
}
