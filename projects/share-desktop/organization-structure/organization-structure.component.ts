/**
 * @作者: zc
 * @时间: 2018-11-01 17:43:08
 * @描述: 可见范围选择模态框
 * @使用: <zc-organization-structure
 *          [(isVisible)]="isVisible"
 *          [beChosen]="viewRanges"
 *          [tabParam]="{organizational:true,organizationalShowType:'department'}"
 *          (result)="retData($event)">
 *        </zc-organization-structure>
 */
import { Component, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NzTreeNodeOptions, NzTreeComponent } from 'ng-zorro-antd';
import { OrganizationStructureService } from './organization-structure.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { MalihuScrollbarComponent } from '../component';
import { isClone } from '../core';

@Component({
  selector: 'zc-organization-structure',
  templateUrl: './organization-structure.component.html',
  styleUrls: ['./organization-structure.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class OrganizationStructureComponent extends MalihuScrollbarComponent {

  protected scrollbar$: Array<string> = ['#scrollbarA', '#scrollbarB', '#scrollbarC', '#scrollbarD', '#scrollbarSelect'];

  private _isVisible = false;

  @Input() tabParam = {
    // 组织架构
    organizational: true,
    // 组织架构类型: department:部门 staff:成员 （为空或没有该属性时为全部）
    organizationalShowType: '',
    // 岗位
    post: true,
    // 编制
    departmentPost: true,
    // 标签
    tag: true,
  };

  @Input() beChosen: Array<any>;

  @Input()
  set isVisible(_data: boolean) {
    this._isVisible = _data;
    if (_data) {
      this.selectItems = [];
      // this.getDataLoad();
      if (this.tabParam.organizational) { this.setDeparMemberTreeSelect(this.nodesDMT, isClone(this.beChosen)); }
      if (this.tabParam.tag) { this.setRecruitTagSelect(this.nodesRTT, isClone(this.beChosen)); }
      if (this.tabParam.post) { this.setCompanyPostSelect(this.nodesCPT, isClone(this.beChosen)); }
      if (this.tabParam.departmentPost) { this.setDepartmentPostTreeSelect(this.nodesDPT, isClone(this.beChosen)); }
      setTimeout(() => {
        this.setNcksTREE();
        // this.selectItems = [];
        // if (this.tabParam.organizational) { this.getCheckedNodeListDMT(); }
        // if (this.tabParam.tag) { this.getCheckedNodeListRTT(); }
        // if (this.tabParam.post) { this.getCheckedNodeListCPT(); }
        // if (this.tabParam.departmentPost) { this.getCheckedNodeListDPT(); }
      }, 300);
    }
  }
  get isVisible() { return this._isVisible; }

  @Output() isVisibleChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  stbcDPT = true;

  @ViewChild('treeComDMT') treeComDMT: NzTreeComponent;
  @ViewChild('treeComCPT') treeComCPT: NzTreeComponent;
  @ViewChild('treeComRTT') treeComRTT: NzTreeComponent;
  @ViewChild('treeComDPT') treeComDPT: NzTreeComponent;

  // 已选择项目
  public selectItems: Array<any> = [];
  public ncksDMT: Array<string> = [];
  public ncksCPT: Array<string> = [];
  public ncksRTT: Array<string> = [];
  public ncksDPT: Array<string> = [];

  // 搜索值
  public searchValue: string;

  // 部门人员树结构原数据
  public nodesDMT: NzTreeNodeOptions[] = [];

  // 岗位原数据
  public nodesCPT: NzTreeNodeOptions[] = [];

  // 标签原数据
  public nodesRTT: NzTreeNodeOptions[] = [];

  // 编制树结构原数据
  public nodesDPT: NzTreeNodeOptions[] = [];

  constructor(
    private organizationStructureService: OrganizationStructureService,
    protected changeDetectorRef$: ChangeDetectorRef,
    protected mScrollbarService$: MalihuScrollbarService
  ) {
    super(changeDetectorRef$, mScrollbarService$);
    this.getDataLoad();
  }

  private getDataLoad() {
    if (this.tabParam.organizational) { this.getDeparMemberTree(); }
    if (this.tabParam.post) { this.getCompanyPost(); }
    if (this.tabParam.tag) { this.getRecruitTag(); }
    if (this.tabParam.departmentPost) { this.getDepartmentPostTree(); }
  }

  // 获取编制树
  private getDepartmentPostTree() {
    this.organizationStructureService.getDepartmentPostTree().subscribe(
      res => this.nodesDPT = res
    );
  }

  // 获取通讯录标签
  private getRecruitTag() {
    this.organizationStructureService.getRecruitTag().subscribe(
      res => this.nodesRTT = res
    );
  }

  // 获取公司所有岗位
  private getCompanyPost() {
    this.organizationStructureService.getCompanyPost().subscribe(
      res => this.nodesCPT = res
    );
  }

  // 获取通讯录所有部门（树形结构）和员工
  private getDeparMemberTree() {
    this.organizationStructureService.getDeparMemberTree().subscribe(res => {
      if (this.tabParam.organizationalShowType && this.tabParam.organizationalShowType === 'department') {
        console.log('department');
        this.nodesDMT = this.setTreeDisabledType(res, 'staff');
      } else if (this.tabParam.organizationalShowType && this.tabParam.organizationalShowType === 'staff') {
        console.log('staff');
        this.nodesDMT = this.setTreeDisabledType(res, 'department');
      } else {
        console.log('all');
        this.nodesDMT = res;
      }
    });
  }

  // 禁用通讯录指定类型
  private setTreeDisabledType(list$: Array<any>, type: string) {
    list$.map(ele => {
      if (ele.type === type) {
        ele.disabled = true;
      }
      if (ele.children) {
        ele.children = this.setTreeDisabledType(ele.children, type);
      }
    });
    return list$;
  }

  // 设置通讯录所有部门（树形结构）和员工 选中默认传递参数
  private setDeparMemberTreeSelect(list: Array<any>, items: Array<any>) {
    list.forEach(ele => {
      items.forEach(item => {
        if (!item.checked) {
          if (item.type === 'department' && ele.type === 'department' && ele.id.toString() === item.targetId.toString()) {
            ele.checked = true; item.checked = true; this.ncksDMT.push(ele.key); this.selectItems.push(ele);
          }
          if (item.type === 'postcode' && ele.type === 'staff' && ele.post_code.toString() === item.targetId.toString()) {
            ele.checked = true; item.checked = true; this.ncksDMT.push(ele.key); this.selectItems.push(ele);
          }
          if (item.type === 'staff' && ele.type === 'staff' && ele.staff_uuid.toString() === item.targetId.toString()) {
            ele.checked = true; item.checked = true; this.ncksDMT.push(ele.key); this.selectItems.push(ele);
          }
          if (ele.children) { this.setDeparMemberTreeSelect(ele.children, items); }
        }
      });
    });
  }

  // 设置公司所有岗位 选中默认传递参数
  private setCompanyPostSelect(list: Array<any>, items: Array<any>) {
    list.forEach(ele => {
      items.forEach(item => {
        if (!item.checked) {
          if (item.type === 'post' && ele.type === 'post' && ele.id.toString() === item.targetId.toString()) {
            ele.checked = true; item.checked = true; this.ncksCPT.push(ele.key); this.selectItems.push(ele);
          }
          if (ele.children) { this.setCompanyPostSelect(ele.children, items); }
        }
      });
    });
  }

  // 设置通讯录标签 选中默认传递参数
  private setRecruitTagSelect(list: Array<any>, items: Array<any>) {
    list.forEach(ele => {
      items.forEach(item => {
        if (!item.checked) {
          if (item.type === 'tag' && ele.type === 'tag' && ele.tagUuid.toString() === item.targetId.toString()) {
            ele.checked = true; item.checked = true; this.ncksRTT.push(ele.key); this.selectItems.push(ele);
          }
          if (ele.children) { this.setRecruitTagSelect(ele.children, items); }
        }
      });
    });
  }

  // 设置编制树 选中默认传递参数
  private setDepartmentPostTreeSelect(list: Array<any>, items: Array<any>) {
    list.forEach(ele => {
      items.forEach(item => {
        if (!item.checked) {
          if (item.type === 'department_post' && ele.type === 'department_post' && ele.department_id.toString() === item.targetId.toString() && ele.id.toString() === item.postId.toString()) {
            ele.checked = true; item.checked = true; this.ncksDPT.push(ele.key); this.selectItems.push(ele);
          }
          if (ele.children) { this.setDepartmentPostTreeSelect(ele.children, items); }
        }
      });
    });
  }

  /**
   * 操作动作
   * @param type 动作类型
   * @param e event
   */
  public mouseAction(type: string, e: any) {
    this.selectItems = [];
    switch (type) {
      case 'CheckBoxDMT':
        this.getCheckedNodeListDMT();
        break;
      case 'CheckBoxCPT':
        this.getCheckedNodeListCPT();
        break;
      case 'CheckBoxRTT':
        this.getCheckedNodeListRTT();
        break;
      case 'CheckBoxDPT':
        this.getCheckedNodeListDPT();
        break;
      default:
        break;
    }
  }

  // 获取 DMT 选中的节点
  private getCheckedNodeListDMT() {
    this.ncksDMT = [];
    const gcnl$ = this.treeComDMT.nzTreeService.getCheckedNodeList();
    gcnl$.forEach(ele => {
      this.selectItems.push(ele.origin);
      this.ncksDMT.push(ele.origin.key);
    });
    super.updateScrollbarView();
  }

  // 获取 CPT 选中的节点
  private getCheckedNodeListCPT() {
    this.ncksCPT = [];
    const gcnl$ = this.treeComCPT.nzTreeService.getCheckedNodeList();
    gcnl$.forEach(ele => {
      this.selectItems.push(ele.origin);
      this.ncksCPT.push(ele.origin.key);
    });
    super.updateScrollbarView();
  }

  // 获取 RTT 选中的节点
  private getCheckedNodeListRTT() {
    this.ncksRTT = [];
    const gcnl$ = this.treeComRTT.nzTreeService.getCheckedNodeList();
    gcnl$.forEach(ele => {
      this.selectItems.push(ele.origin);
      this.ncksRTT.push(ele.origin.key);
    });
    super.updateScrollbarView();
  }

  // 获取 DPT 选中的节点
  private getCheckedNodeListDPT() {
    this.ncksDPT = [];
    const gcnl$ = this.treeComDPT.nzTreeService.getCheckedNodeList();
    gcnl$.forEach(ele => {
      if (this.stbcDPT) {
        this.selectItems.push(ele.origin);
        this.ncksDPT.push(ele.origin.key);
      } else {
        this.setChangeStbcDPT(this.nodesDPT, ele.origin.id);
      }
    });
    super.updateScrollbarView();
  }

  private setChangeStbcDPT(items: Array<any>, id: number) {
    items.forEach(ele => {
      if (ele.id === id) {
        this.selectItems.push(ele);
        this.ncksDPT.push(ele.key);
      }
      if (ele.children) {
        this.setChangeStbcDPT(ele.children, id);
      }
    });
  }

  /**
   * 关闭已选择项目
   */
  public closeSelectItem(item: any) {
    const si$ = this.selectItems.findIndex(ele => {
      if (ele.staff_uuid && ele.icon === item.icon && ele.staff_uuid === item.staff_uuid) { return ele; }
      if (ele.id_source && ele.icon === item.icon && ele.id === item.id) { return ele; }
      if (ele.post_category_id && ele.icon === item.icon && ele.id === item.id) { return ele; }
      if (ele.tagUuid && ele.icon === item.icon && ele.tagUuid === item.tagUuid) { return ele; }
      if (ele.department_id && ele.icon === item.icon && ele.id === item.id && ele.department_id === item.department_id) { return ele; }
    });
    if (si$ !== -1) {
      this.selectItems.splice(si$, 1);
      this.setNcksTREE();
    }
  }

  private setNcksTREE() {
    this.ncksDMT = [];
    this.ncksCPT = [];
    this.ncksRTT = [];
    this.ncksDPT = [];
    this.selectItems.forEach(ele => {
      this.ncksDMT.push(ele.key);
      this.ncksCPT.push(ele.key);
      this.ncksRTT.push(ele.key);
      this.ncksDPT.push(ele.key);
    });
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
