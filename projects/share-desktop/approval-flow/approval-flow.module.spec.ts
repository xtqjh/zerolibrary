import { ApprovalFlowModule } from './approval-flow.module';

describe('ApprovalFlowModule', () => {
  let approvalFlowModule: ApprovalFlowModule;

  beforeEach(() => {
    approvalFlowModule = new ApprovalFlowModule();
  });

  it('should create an instance', () => {
    expect(approvalFlowModule).toBeTruthy();
  });
});
