import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ApprovalStatus } from '../../approval-flow.service';

@Component({
    selector: 'zc-flow-details-item',
    templateUrl: './flow-details-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowDetailsItemComponent {

    timeLineInfoList;

    ApprovalStatus = ApprovalStatus;

    @ViewChild('rejectTmp') rejectTmp;

    @ViewChild('auditedTmp') auditedTmp;

    statusColor = {
        Audited: 'green',
        InAudit: '#2486F4',
        Reject: 'red'
    };

    @Input() set value(val) {
        if (val && Array.isArray(val)) {
            this.setTimeLineInfoList(val);
        }
    }


    setTimeLineInfoList(list) {
        list = list || [];
        this.timeLineInfoList = [...list].map((item) => {
            if (item.auditStatus === 'Reject') {
                item.approverAuditValues = item.approverAuditValues.filter((valueItem) => valueItem.auditStatus);
            }
            return item;
        });
    }

    /**
     * @description 获取状态图标
     * @param status 当前状态
     */
    getTmp(status) {
        switch (status) {
            case 'Audited':
                return this.auditedTmp;
            case 'InAudit':
                return null;
            case 'Reject':
                return this.rejectTmp;
            default:
                return null;
        }
    }

}
