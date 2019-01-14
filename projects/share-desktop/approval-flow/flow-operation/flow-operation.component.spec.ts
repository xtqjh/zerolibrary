import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowOperationComponent } from './flow-operation.component';

describe('FlowOperationComponent', () => {
  let component: FlowOperationComponent;
  let fixture: ComponentFixture<FlowOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
