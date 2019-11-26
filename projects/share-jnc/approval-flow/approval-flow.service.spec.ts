import { TestBed, inject } from '@angular/core/testing';

import { ApprovalFlowService } from './approval-flow.service';

describe('ApprovalFlowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprovalFlowService]
    });
  });

  it('should be created', inject([ApprovalFlowService], (service: ApprovalFlowService) => {
    expect(service).toBeTruthy();
  }));
});
