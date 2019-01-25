import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { FormTemplateService } from '../../form-template.service';

@Component({
  selector: 'zc-form-control-parameter-switch',
  templateUrl: './form-control-parameter-switch.component.html',
  styleUrls: ['../../form-template.component.css']
})
export class FormControlParameterSwitchComponent implements OnInit {

  @Input() item: FormGroup;

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
  }

  // 删除选择项 单选、多选
  delCandidates(_index: number) {
    const _cond = <FormGroup>this.item.controls['conditionField'];
    const _candidates$ = <FormArray>_cond.controls['candidates$'];
    _candidates$.controls.splice(_index, 1);
    _candidates$.updateValueAndValidity();
    this.candidatesChange();
  }

  // 添加选择项 单选、多选
  addCandidates() {
    const _cond = <FormGroup>this.item.controls['conditionField'];
    const _candidates$ = <FormArray>_cond.controls['candidates$'];
    _candidates$.push(this.formTemplateService.fb.group({ value: '选项', switch: false }));
    this.candidatesChange();
  }

  // 选项值绑定 单选、多选
  candidatesChange() {
    setTimeout(() => {
      const _cond = <FormGroup>this.item.controls['conditionField'];
      _cond.setControl('candidates', this.formTemplateService.fb.array([]));
      const _candidates = <FormArray>_cond.controls['candidates'];
      const _candidates$ = <FormArray>_cond.controls['candidates$'];
      _candidates$.controls.forEach((_ele: FormGroup) => {
        _candidates.push(this.formTemplateService.fb.control(_ele.get('value').value));
      });
    }, 300);
  }

  // 指定分支项开启关闭条件
  isSwitchFieldsChange(_switch: boolean, _key: string) {
    const _fields = <FormArray>this.item.controls['fields'];
    if (_switch) {
      const _contr = this.formTemplateService._createFieldForm({ txt: '文本', key: 'Single' });
      _contr.addControl('switchCase', this.formTemplateService.fb.group({
        condition: 'EQUAL_TO',
        conditionValues: this.formTemplateService.fb.array([_key].map(_v => this.formTemplateService.fb.control(_v)))
      }));
      _fields.push(_contr);
      _fields.updateValueAndValidity();
    } else {
      _fields.value.forEach((_ele, _index: number) => {
        const _flf = _fields.value.findIndex(_v => _v.switchCase.conditionValues.filter(_vlv => _vlv === _key).length > 0);
        if (_flf !== -1) {
          _fields.controls.splice(_flf, 1);
          _fields.updateValueAndValidity();
        }
      });
    }
  }

  // 条件类型切换
  conditionTypeChange(event: string) {
    const _conditionField = <FormGroup>this.item.controls['conditionField'];
    const _candidates = <FormArray>_conditionField.controls['candidates'];
    _candidates.controls.splice(0, _candidates.length);
    _candidates.updateValueAndValidity();
    _candidates.push(this.formTemplateService.fb.control(event === 'Boolean' ? '是' : '分支一'));
    _candidates.push(this.formTemplateService.fb.control(event === 'Boolean' ? '否' : '分支二'));

    _conditionField.setControl('candidates$', this.formTemplateService.fb.array([]));
    _conditionField.get('candidates').value.forEach(_ele => {
      const _candidates$ = <FormArray>_conditionField.controls['candidates$'];
      const _fields = <FormArray>this.item.controls['fields'];
      _fields.controls.splice(0, _fields.length);
      _fields.updateValueAndValidity();
      _candidates$.push(this.formTemplateService.fb.group({ value: _ele, switch: false }));
    });
  }

}
