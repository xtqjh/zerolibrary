import { Component, Input, OnChanges, AfterContentChecked, AfterViewChecked, DoCheck, SimpleChanges } from '@angular/core';
import { FormTemplateService } from '../../form-template.service';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'zc-form-control-parameter-validators',
  templateUrl: './form-control-parameter-validators.component.html',
  styleUrls: ['../../form-template.component.css']
})
export class FormControlParameterValidatorsComponent implements OnChanges {

  @Input() item: FormGroup;

  @Input() control: Array<any>;

  @Input() itemChange: any;

  constructor(
    private formTemplateService: FormTemplateService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setValidatorsBodyObjectToArray();
  }

  // bodyObject 转换为 bodyArray
  private setValidatorsBodyObjectToArray() {
    if (this.item.value.validators) {
      const _validators = <FormArray>this.item.controls['validators'];
      _validators.controls.forEach((async: FormGroup) => {
        if (async.get('type').value === 'async') {
          const list = [];
          const body = <FormGroup>async.controls['body'];
          if (body.value === null) {
            list.push(this.formTemplateService.fb.group({ label: 'param', value: null }));
          }
          for (const key in body.value) {
            if (body.value.hasOwnProperty(key)) {
              list.push(this.formTemplateService.fb.group({ label: key, value: body.value[key] }));
            }
          }
          async.addControl('bodyArr', this.formTemplateService.fb.array(list));
          async.updateValueAndValidity();
        }
      });
    }
  }

  // bodyArray 转换为 bodyObject
  private setValidatorsBodyArrayToObject() {
    const _validators = <FormArray>this.item.controls['validators'];
    _validators.controls.forEach((async: FormGroup, index: number) => {
      if (async.get('type').value === 'async') {
        const bodyArr = <FormArray>async.controls['bodyArr'];
        const body = <FormGroup>async.controls['body'];
        const brb = {};
        bodyArr.controls.forEach((ba: FormGroup) => {
          brb[ba.get('label').value] = ba.get('value').value;
        });
        body.patchValue(brb);
        bodyArr.updateValueAndValidity();
      }
    });
  }

  /**
   * 添加请求参数
   */
  public addAsyncBody() {
    const _validators = <FormArray>this.item.controls['validators'];
    _validators.controls.forEach((async: FormGroup) => {
      if (async.get('type').value === 'async') {
        const bodyArr = <FormArray>async.controls['bodyArr'];
        bodyArr.controls.push(this.formTemplateService.fb.group({
          label: `param${bodyArr.controls.length + 1}`,
          value: null
        }));
        bodyArr.updateValueAndValidity();
      }
    });
  }

  /**
   * 移除请求参数
   */
  public removeAsyncBody(index: number) {
    const _validators = <FormArray>this.item.controls['validators'];
    _validators.controls.forEach((async: FormGroup) => {
      if (async.get('type').value === 'async') {
        const bodyArr = <FormArray>async.controls['bodyArr'];
        bodyArr.controls.splice(index, 1);
        bodyArr.updateValueAndValidity();
        this.asyncBodyChange();
      }
    });
  }

  /**
   * 请求参数数据变换回调
   */
  public asyncBodyChange() {
    this.setValidatorsBodyArrayToObject();
  }

}
