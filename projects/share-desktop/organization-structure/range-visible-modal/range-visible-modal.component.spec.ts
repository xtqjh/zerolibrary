import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeVisibleModalComponent } from './range-visible-modal.component';

describe('RangeVisibleModalComponent', () => {
  let component: RangeVisibleModalComponent;
  let fixture: ComponentFixture<RangeVisibleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeVisibleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeVisibleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
