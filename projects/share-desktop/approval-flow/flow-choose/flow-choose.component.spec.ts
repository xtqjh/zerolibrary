import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowChooseComponent } from './flow-choose.component';

describe('FlowChooseComponent', () => {
  let component: FlowChooseComponent;
  let fixture: ComponentFixture<FlowChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
