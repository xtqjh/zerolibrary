/**
 * @作者: zc
 * @时间: 2019-01-29 11:17:43
 * @描述: 流程审批选择
 * @使用: <zc-flow-choose #flow name="flowId" [ngModel]="flowId"></zc-flow-choose>
 * @使用: @ViewChild('flow') flow;
 */
import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, forwardRef, ViewEncapsulation } from '@angular/core';
import { ApprovalFlowService } from '../approval-flow.service';
import { Employee, WindowsService } from 'jsw-electron-sdk';
import { from } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'zc-flow-choose',
  templateUrl: './flow-choose.component.html',
  styleUrls: ['./flow-choose.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FlowChooseComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowChooseComponent implements ControlValueAccessor {

  public itemFlow = { approverAudits: [], ccStaff: [] };

  // 审批候选人列表
  private approversCandidate = [];

  // 抄送候选人列表
  private ccStaffCandidate = [];

  // 审批选择框
  public isVisibleApprover = false;

  onChange: (value: any) => void = () => null;

  constructor(
    private approvalFlowService: ApprovalFlowService,
    private cdr: ChangeDetectorRef
  ) { }

  private markForCheck() {
    this.cdr.markForCheck();
    this.onChange(this.itemFlow);
  }

  writeValue(value: any) {
    // console.log(value);
    if (value) { this.getLoadFlow(value); }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(value: any) {
    // console.log(value);
  }

  // 获取审批
  private getLoadFlow(flowId) {
    this.approvalFlowService.loadFlow$(flowId).subscribe(res => {
      if (res) {
        this.approversCandidate = this.getCandidate(res.approvers, res.staffMap);
        this.ccStaffCandidate = this.getCandidate(res.ccStaff, res.staffMap);
        if (res.pass) {
          this.itemFlow.approverAudits = this.approversCandidate;
          this.itemFlow.ccStaff = this.ccStaffCandidate;
        } else {
          this.itemFlow.ccStaff = this.ccStaffCandidate;
          this.isVisibleApprover = ['department_post', 'staff', 'select'].findIndex((item) => item === res.approvers[0].type) !== -1;
        }
        this.markForCheck();
      }
    });
  }

  // 格式化待选参数
  private getCandidate(approversListSource, staffMap) {
    const approversListId = approversListSource.map((item) => item.id);
    let approversList = [];
    for (const id of approversListId) {
      const list = [...staffMap[id]];
      approversList.push(list);
    }
    approversList = [].concat.apply([], approversList); // 审批人候选人列表
    return approversList;
  }

  // 人员选择框
  private getEmployee(candidates) {
    candidates = <Employee[]>candidates.map((item, id) => {
      return {
        company_uuid: item.companyUuid,
        id,
        staff_uuid: item.staffUuid,
        department_id: item.departmentId,
        post_code: item.postCode,
        name: item.name,
        uid: item.uid,
      };
    });
    return from(WindowsService.openDepartmentEmployeeChooseDialog('employee', { model: 'multi', candidates }));
  }

  /**
   * 打开审批人选择框
   */
  public addApprover() {
    this.getEmployee(this.approversCandidate).subscribe((list) => {
      for (const approverItem of list) {
        this.itemFlow['approverAudits'].push({
          companyUuid: approverItem.company_uuid,
          postCode: approverItem['post_code'],
          staffUuid: approverItem['staff_uuid'],
          name: approverItem.name,
          uid: approverItem.uid
        });
      }
      this.markForCheck();
    });
  }

  /**
   * 关闭审批人
   */
  public deleteProduct(formArrayName, index) {
    this.itemFlow[formArrayName].splice(index, 1);
    this.markForCheck();
  }


}
