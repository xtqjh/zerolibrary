/**
 * @作者: zc
 * @时间: 2018-11-02 10:49:19
 * @描述: 滚动条
 */
import { OnDestroy, AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

export const themeOptions: MCustomScrollbar.CustomScrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

export abstract class MalihuScrollbarComponent implements AfterViewInit, OnDestroy {

  timer = null;

  protected scrollbar$: Array<string> = [];

  constructor(
    protected changeDetectorRef$: ChangeDetectorRef,
    protected mScrollbarService$: MalihuScrollbarService
  ) {
    this.timer = setTimeout(() => {
      this.ngAfterViewInit();
    });
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

    if (this.timer) {
      clearTimeout(this.timer);
    }

    console.log(this.scrollbar$);
    this.scrollbar$.forEach(ele => {
      this.mScrollbarService$.initScrollbar(ele, {
        ...themeOptions, callbacks: {
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
