import { NgModule, ModuleWithProviders } from '@angular/core';

import { DirectiveModule } from './core/directive/directive.module';
import { PipeModule } from './core/pipe/pipe.module';
import { MapBaiduModule } from './map-baidu/map-baidu.module';
import { ImageCropperModule } from './image-cropper/image-cropper.module';
import { OrganizationStructureModule } from './organization-structure/organization-structure.module';
import { AddressModule } from './address/address.module';
import { ApprovalFlowModule } from './approval-flow/approval-flow.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

import { NgArrayPipesModule } from './core/pipe/array/index';
import { NgObjectPipesModule } from './core/pipe/object/index';
import { NgStringPipesModule } from './core/pipe/string/index';
import { NgMathPipesModule } from './core/pipe/math/index';
import { NgBooleanPipesModule } from './core/pipe/boolean/index';

import { CampConfig, ConfigService } from './core/service/config.service';

export * from './animations';
export * from './core';
export * from './component';

export * from './map-baidu';
export * from './image-cropper';
export * from './organization-structure';
export * from './address';
export * from './approval-flow';
export * from './dynamic-form';

@NgModule({
  exports: [
    DirectiveModule,
    PipeModule,
    NgArrayPipesModule,
    NgStringPipesModule,
    NgMathPipesModule,
    NgBooleanPipesModule,
    NgObjectPipesModule,
    MapBaiduModule,
    ImageCropperModule,
    OrganizationStructureModule,
    AddressModule,
    ApprovalFlowModule,
    DynamicFormModule
  ]
})
export class NgShareJncModule {
  static forRoot(config: CampConfig): ModuleWithProviders {
    console.log('forRoot', config);
    return {
      ngModule: NgShareJncModule,
      providers: [
        // ConfigService, CampConfig,
        { provide: CampConfig, useValue: config }
      ]
    };
  }
}
