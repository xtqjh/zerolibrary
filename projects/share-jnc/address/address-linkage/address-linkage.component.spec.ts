import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressLinkageComponent } from './address-linkage.component';

describe('AddressLinkageComponent', () => {
  let component: AddressLinkageComponent;
  let fixture: ComponentFixture<AddressLinkageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressLinkageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressLinkageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
