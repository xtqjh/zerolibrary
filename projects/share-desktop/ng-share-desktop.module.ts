import { ModuleWithProviders, NgModule } from '@angular/core';

import { MapBaiduModule } from './map-baidu/map-baidu.module';
import { ImageCropperModule } from './image-cropper/image-cropper.module';
import { OrganizationStructureModule } from './organization-structure/organization-structure.module';
import { AddressModule } from './address/address.module';
import { ApprovalFlowModule } from './approval-flow';
import { HttpClientModule } from '@angular/common/http';

export * from './service';
export * from './component';

export * from './map-baidu';
export * from './image-cropper';
export * from './organization-structure';
export * from './address';
export * from './approval-flow';

@NgModule({
  exports: [
    MapBaiduModule,
    ImageCropperModule,
    OrganizationStructureModule,
    AddressModule,
    ApprovalFlowModule
  ],
  imports: [
    HttpClientModule,
    MapBaiduModule.forRoot({ apiKey: 'qOz9QmXd4l6hAOY4SFAUst4P' }),
    ImageCropperModule,
    OrganizationStructureModule,
    AddressModule,
    ApprovalFlowModule
  ]
})
export class NgShareDesktopModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgShareDesktopModule
    };
  }
}
