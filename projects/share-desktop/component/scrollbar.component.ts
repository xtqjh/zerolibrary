/**
 * @作者: zc
 * @时间: 2018-11-02 10:49:19
 * @描述: 滚动条
 */
import { OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

export class MalihuScrollbarComponent implements AfterViewInit, OnDestroy {

  protected scrollbar$: Array<string> = [];

  constructor(
    protected changeDetectorRef$: ChangeDetectorRef,
    protected mScrollbarService$: MalihuScrollbarService
  ) {

  }

  /**
   * 更新滚动视图
   */
  updateScrollbarView() {
    this.updateDetectorRefView();
    this.scrollbar$.forEach(ele => {
      this.mScrollbarService$.update(ele);
    });
  }

  /**
   * 更新页面视图
   */
  updateDetectorRefView() {
    this.changeDetectorRef$.markForCheck();
    this.changeDetectorRef$.detectChanges();
  }

  ngAfterViewInit() {
    console.log(this.scrollbar$);
    this.scrollbar$.forEach(ele => {
      this.mScrollbarService$.initScrollbar(ele, {
        axis: 'y', theme: 'minimal-dark', callbacks: {
          onTotalScrollOffset: 200,
          onTotalScroll: () => {
            this.scrolled();
          }
        }
      });
    });
  }

  scrolled() { }

  ngOnDestroy() {
    this.scrollbar$.forEach(ele => {
      this.mScrollbarService$.destroy(ele);
    });
  }


}
