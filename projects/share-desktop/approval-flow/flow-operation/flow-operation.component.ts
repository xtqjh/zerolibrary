/**
 * @作者: zc
 * @时间: 2019-01-08 11:38:25
 * @描述: 流程审批选择
 * @描述: <zc-flow-operation [flowId]="flowId"></zc-flow-operation>
 */
import { Component, Input, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { from } from 'rxjs';
import { ChooseOpinion, Employee, WindowsService } from 'jsw-electron-sdk';
import { ApprovalFlowService } from '../approval-flow.service';

@Component({
  selector: 'zc-flow-operation',
  templateUrl: './flow-operation.component.html',
  styleUrls: ['./flow-operation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class FlowOperationComponent {

  private flowId$: number;
  @Input() set flowId(data: number) {
    this.flowId$ = data;
    if (data) { this.getLoadFlow(data); }
  }
  get flowId() {
    return this.flowId$;
  }

  private flow: any;

  public itemFlow = {
    approverAudits: [],
    ccStaff: []
  };

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private approvalFlowService: ApprovalFlowService
  ) {
  }

  private markForCheck() {
    this.cdr.markForCheck();
  }

  private getLoadFlow(flowId) {
    this.approvalFlowService.loadFlow$(flowId).subscribe(
      res => this.buildApprs(res)
    );
  }

  private buildApprs(data: { approvers: Array<any>, ccStaff: Array<any>, staffMap: any, pass: boolean }) {
    this.flow = data;
    if (this.flow.approvers.length) {
      this.flow.approvers.forEach(e => {
        const appr = this.flow.staffMap[e.id];
        if (appr) {
          if (appr.length === 1) {
            const a = appr[0];
            a.checked = true;
            this.itemFlow.approverAudits.push(a);
          } else {
            this.itemFlow.approverAudits.push({
              name: e.name,
              checked: false
            });
          }
        }
      });
    } else {
      this.itemFlow.approverAudits.push({
        name: '自选',
        checked: false
      });
    }
    if (this.flow.ccStaff.length) {
      this.flow.ccStaff.forEach(e => {
        const appr = this.flow.staffMap[e.id];
        if (appr) {
          if (appr.length === 1) {
            const a = appr[0];
            a.checked = true;
            this.itemFlow.ccStaff.push(a);
          } else {
            this.itemFlow.ccStaff.push({
              name: e.name,
              checked: false
            });
          }
        }
      });
    } else {
      this.itemFlow.ccStaff.push({
        name: '自选',
        checked: false
      });
    }

    this.markForCheck();
  }

  public chooseAppr(appr, index) {
    if (appr.checked) {
      return;
    }
    const cands = this.flow.staffMap[appr.id];
    const ops: ChooseOpinion = {};
    if (cands && cands.length) {
      const employees: Array<Employee> = cands.map((c, id) => {
        return {
          company_uuid: c.companyUuid,
          post_code: c.postCode,
          name: c.name,
          department_id: c.departmentId,
          id: id,
          uid: c.uid
        };
      });
      ops.candidates = employees;
    } else {
      ops.model = 'single';
    }
    from(WindowsService.openDepartmentEmployeeChooseDialog('employee', ops))
      .subscribe((res: Array<Employee>) => {
        console.log(res);
        this.itemFlow.approverAudits[index] = {
          'staffUuid': res[0].staff_uuid,
          'companyUuid': res[0].company_uuid,
          'postCode': res[0].post_code,
          'departmentId': res[0].department_id,
          'name': res[0].name,
          'subName': res[0].department_name + ' ' + res[0].post_name,
          'uid': res[0].uid
        };
      });
  }

}
