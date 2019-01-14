import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBaiduPositionComponent } from './map-baidu-position.component';

describe('MapBaiduPositionComponent', () => {
  let component: MapBaiduPositionComponent;
  let fixture: ComponentFixture<MapBaiduPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBaiduPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBaiduPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
