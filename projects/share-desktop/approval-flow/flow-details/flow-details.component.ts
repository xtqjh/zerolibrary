/**
 * @作者: zc
 * @时间: 2019-01-29 17:45:34
 * @描述: 审批状态查看
 * @使用: <zc-flow-details [ngModel]="flowInstanceUuid"></zc-flow-details>
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { ApprovalFlowService } from '../approval-flow.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'zc-flow-details',
  templateUrl: './flow-details.component.html',
  styleUrls: ['./flow-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FlowDetailsComponent),
    multi: true
  }]
})
export class FlowDetailsComponent implements ControlValueAccessor {

  statusColor = {
    Audited: 'green',
    InAudit: '#f60',
    Reject: 'red'
  };

  currentStepStatus = '';

  steps = [];

  ccStaffsNameStr = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private approvalFlowService: ApprovalFlowService
  ) { }

  writeValue(value: any) {
    if (value) { this.getApprovalProcessDetail(value); }
  }

  onChange: (value: any) => void = () => null;
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(value: any) {
    // console.log(value);
  }

  private markForCheck() {
    this.cdr.markForCheck();
  }

  /**
   * @description 获取审批详情
   */
  getApprovalProcessDetail(uuid: string) {
    this.approvalFlowService.getFlowDetail(uuid).subscribe((res) => {

      this.currentStepStatus = res.auditStatus;
      this.steps = [...res.steps].reverse();

      [...res.ccStaffs].forEach((item) => {
        this.ccStaffsNameStr = item.name + ',';
      });
      this.ccStaffsNameStr = this.ccStaffsNameStr.slice(0, -1);
      this.markForCheck();
    });
  }


}
