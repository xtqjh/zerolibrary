/**
 * @作者: zc
 * @时间: 2019-01-25 17:06:45
 * @描述: 表单工具
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ImageCropperModule } from '../image-cropper/image-cropper.module';
import { FormPostFieldsComponent } from './form-post-fields/form-post-fields.component';
import { ChooseComponent } from './form-post-fields/choose/choose.component';
import { DateComponent } from './form-post-fields/date/date.component';
import { TextComponent } from './form-post-fields/text/text.component';
import { TextAreaComponent } from './form-post-fields/textarea/textarea.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { FormControlParameterComponent } from './form-template/form-control-parameter/form-control-parameter.component';
import { FormTemplateAlterComponent } from './form-template/form-template-alter/form-template-alter.component';
import { FormControlLibraryComponent } from './form-template/form-control-library/form-control-library.component';
import { FormControlIndexComponent } from './form-template/form-control-index/form-control-index.component';
import { FormControlFileComponent } from './form-template/form-control-index/form-control-file/form-control-file.component';
import { FormControlDetailedComponent } from './form-template/form-control-index/form-control-detailed/form-control-detailed.component';
import { FormControlSelectComponent } from './form-template/form-control-index/form-control-select/form-control-select.component';
import { FormControlInputComponent } from './form-template/form-control-index/form-control-input/form-control-input.component';
import { FormControlSwitchComponent } from './form-template/form-control-index/form-control-switch/form-control-switch.component';
import { FormControlParameterFormulaComponent } from './form-template/form-control-parameter/form-control-parameter-formula/form-control-parameter-formula.component';
import { FormControlParameterChooseComponent } from './form-template/form-control-parameter/form-control-parameter-choose/form-control-parameter-choose.component';
import { FormControlParameterSwitchComponent } from './form-template/form-control-parameter/form-control-parameter-switch/form-control-parameter-switch.component';
import { FormControlParameterFileComponent } from './form-template/form-control-parameter/form-control-parameter-file/form-control-parameter-file.component';
import { FormControlParameterValidatorsComponent } from './form-template/form-control-parameter/form-control-parameter-validators/form-control-parameter-validators.component';
import { FormControlSuiteComponent } from './form-template/form-control-index/form-control-suite/form-control-suite.component';

const COMPONENT = [
  ChooseComponent,
  DateComponent,
  TextComponent,
  TextAreaComponent,
  FormTemplateAlterComponent,
  FormControlParameterComponent,
  FormControlParameterFormulaComponent,
  FormControlParameterChooseComponent,
  FormControlParameterSwitchComponent,
  FormControlParameterFileComponent,
  FormControlParameterValidatorsComponent,
  FormControlLibraryComponent,
  FormControlIndexComponent,
  FormControlFileComponent,
  FormControlDetailedComponent,
  FormControlSelectComponent,
  FormControlInputComponent,
  FormControlSwitchComponent,
  FormControlSuiteComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ImageCropperModule
  ],
  declarations: [
    COMPONENT,
    FormPostFieldsComponent,
    FormTemplateComponent
  ],
  exports: [
    FormPostFieldsComponent,
    FormTemplateComponent
  ]
})
export class DynamicFormModule { }


