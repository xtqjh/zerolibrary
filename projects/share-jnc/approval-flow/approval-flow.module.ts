import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { FlowOperationComponent } from './flow-operation/flow-operation.component';
import { FlowChooseComponent } from './flow-choose/flow-choose.component';
import { FlowDetailsComponent } from './flow-details/flow-details.component';
import { FlowDetailsItemComponent } from './flow-details/flow-details-item/flow-details-item.component';

const COMPONENT = [
  FlowOperationComponent,
  FlowChooseComponent,
  FlowDetailsComponent,
  FlowDetailsItemComponent
];
@NgModule({
  declarations: [...COMPONENT],
  exports: [...COMPONENT],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ]
})
export class ApprovalFlowModule { }
