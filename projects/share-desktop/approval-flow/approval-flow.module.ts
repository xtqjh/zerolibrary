import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { FlowOperationComponent } from './flow-operation/flow-operation.component';

const COMPONENT = [
  FlowOperationComponent
];
@NgModule({
  declarations: [...COMPONENT],
  exports: [...COMPONENT],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class ApprovalFlowModule { }
