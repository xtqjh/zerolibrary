/**
 * @作者: zc
 * @时间: 2019-01-15 17:25:18
 * @描述: 产品选择模态框
 * @使用: <zc-product-modal
 *          [(isVisible)]="isVisible"
 *          [beChosen]="viewRanges"
 *          (result)="retData($event)">
 *        </zc-product-modal>
 */
import { Component, Input, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { MalihuScrollbarComponent } from '../../component/scrollbar.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'zc-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductModalComponent extends MalihuScrollbarComponent {

  protected scrollbar$: Array<string> = ['#scrollbar', '#scrollbarSelect'];

  private _isVisible = false;

  @Input() beChosen: Array<any>;

  @Input() set isVisible(_data: boolean) {
    this._isVisible = _data;
    if (_data) {
      this.selectItems = [];
    }
  }
  get isVisible() { return this._isVisible; }

  @Output() isVisibleChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  // 搜索值
  public searchValue: string;

  public listLCWS: Array<any> = [];

  // 已选择项目
  public selectItems: Array<any> = [];

  constructor(
    private productService: ProductService,
    protected changeDetectorRef$: ChangeDetectorRef,
    protected mScrollbarService$: MalihuScrollbarService
  ) {
    super(changeDetectorRef$, mScrollbarService$);
    this.productService.getLocalCateWithSupplier({ size: 999 })
      .subscribe(data => {
        this.listLCWS = data;
        // super.updateScrollbarView();
      });
  }

  /**
   * 向存储器中添加选中项，已存在就删除
   */
  private setListSelect(item: any) {
    if (this.selectItems.length === 0) {
      this.selectItems.push(item);
    } else {
      let newItem = true;
      for (const si in this.selectItems) {
        if (this.selectItems[si]['productCode'] === item['productCode'] && this.selectItems[si]['channel'] === item['channel']) {
          this.selectItems.splice(Number(si), 1);
          newItem = false;
          return false;
        }
      }
      if (newItem) {
        this.selectItems.push(item);
      }
    }
  }

  private setListStatus() {
    this.listLCWS.map(l => l.select = false);
    this.selectItems.forEach(si => {
      this.listLCWS.map(l => {
        if (si['productCode'] === l['productCode']) {
          l.select = true;
        }
      });
    });
  }

  /**
   * 产品选中
   */
  public clickSelectProducts(pro: any) {
    pro.select = !pro.select;
    this.setListSelect(pro);
  }

  /**
   * 关闭已选择的产品
   */
  public closeSelect(item) {
    this.setListSelect(item);
    this.setListStatus();
  }

  /**
   * 确定按钮
   */
  public handleOk() {
    this.result.emit(this.selectItems);
    this.handleCance();
  }

  /**
   * 取消按钮
   */
  public handleCance() {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }

}
