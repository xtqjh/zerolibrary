/**
 * @作者: zc
 * @时间: 2018-07-20 19:53:01
 * @描述: 控件设置
 */
import { Component, OnInit, Input } from '@angular/core';
import { FormTemplateService, ValiDators, Parameter } from '../form-template.service';
import { FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'zc-form-control-parameter',
  templateUrl: './form-control-parameter.component.html',
  styleUrls: ['../form-template.component.css']
})
export class FormControlParameterComponent {

  @Input() parameter: Parameter;

  // @Input() fields: Array<GroupForm | GroupSwitchForm | FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct | ItemForm>;
  @Input() fields: FormArray;

  @Input() set guid(_data: string) {
    // const _fields = this.fields.value.find(_ele => _ele['guid'] === _data);
    const _fields = this.fields.controls.find(_ele => _ele.get('guid').value === _data);
    if (_fields) {
      this.setGroupItemSelect(_fields);
    } else {
      this.fields.controls.forEach((_field: FormGroup, _index: number) => {
        if (_field.get('type').value === 'Group' || _field.get('type').value === 'GroupSwitch' || _field.get('type').value === 'GroupSuite') {
          const control = <FormArray>_field.controls['fields'];
          const _item = control.controls.find(_ele => _ele.get('guid').value === _data);
          if (_item) {
            this.setGroupItemSelect(_item);
          }
        }
      });
    }
  }

  // 每一个类型的数据结构不一样，so在这里不指定
  item: FormGroup;

  // 条件列表
  validators: Array<ValiDators>;

  // 控件列表
  control: Array<any>;

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  // 初始化选中
  private setGroupItemSelect(_data) {
    console.log(_data);
    this.item = _data;

    this.setTypeIsBind();
    if (this.item.get('type').value !== 'Group' && this.item.get('type').value !== 'GroupSwitch' && this.item.get('type').value !== 'GroupSuite') {
      this.validatorsToViewItem();
    }
    // if (this.item.get('type').value === 'Formula') {
    this.getControlItem();
    // }
  }

  // 抽取控件列表
  private getControlItem() {
    this.control = [];
    this.fields.controls.forEach((_field: FormGroup, _index: number) => {
      if (_field.get('type').value !== 'Group' && _field.get('type').value !== 'GroupSwitch' && _field.get('type').value !== 'GroupSuite') {
        this.control.push({ id: _field.get('id').value, name: _field.get('name').value, guid: _field.get('guid').value, type: _field.get('type').value });
      }
      if (_field.get('type').value === 'Group' || _field.get('type').value === 'GroupSuite') {
        const _control = <FormArray>_field.controls['fields'];
        _control.controls.forEach(_ele => {
          if (_ele.get('type').value !== 'Group' && _ele.get('type').value !== 'GroupSwitch' && _ele.get('type').value !== 'GroupSuite') {
            this.control.push({ id: _ele.get('id').value, name: _ele.get('name').value, guid: _ele.get('guid').value, type: _ele.get('type').value });
          }
        });
      }
    });
  }

  // 初选参数
  private setTypeIsBind() {
    switch (this.item.get('type').value) {
      case 'GroupSwitch':
        const _cond = <FormGroup>this.item.controls['conditionField'];
        _cond.setControl('candidates$', this.formTemplateService.fb.array([]));
        _cond.get('candidates').value.forEach(_ele => {
          const _candidates$ = <FormArray>_cond.controls['candidates$'];
          const _fields = <FormArray>this.item.controls['fields'];
          const _flf = _fields.value.filter(_v => _v.switchCase.conditionValues.filter(_vlv => _vlv === _ele).length > 0);
          _candidates$.push(this.formTemplateService.fb.group({ value: _ele, switch: _flf.length > 0 ? true : false }));
        });
        break;

      case 'SingleChoose': case 'Choose':
        this.item.setControl('candidates', this.formTemplateService.fb.array(this.item.get('candidates') ? this.item.get('candidates').value : ['选项']));
        this.item.setControl('number', this.formTemplateService.fb.control(this.item.get('number') ? this.item.get('number').value : 1));
        this.item.setControl('candidates$', this.formTemplateService.fb.array([]));
        this.item.get('candidates').value.forEach(_ele => {
          const _candidates$ = <FormArray>this.item.controls['candidates$'];
          _candidates$.push(this.formTemplateService.fb.group({ value: _ele }));
        });
        break;

      case 'DateRange':
        this.item.setControl('showDayCount', this.formTemplateService.fb.control(this.item.get('showDayCount') ? this.item.get('showDayCount').value : false));
        this.item.setControl('startName', this.formTemplateService.fb.control(this.item.get('startName') ? this.item.get('startName').value : '开始时间'));
        this.item.setControl('endName', this.formTemplateService.fb.control(this.item.get('endName') ? this.item.get('endName').value : '结束时间'));
        this.item.setControl('countName', this.formTemplateService.fb.control(this.item.get('countName') ? this.item.get('countName').value : '天数'));
        this.item.setControl('level', this.formTemplateService.fb.control(this.item.get('level') ? this.item.get('level').value : 3));
        break;

      case 'Geography':
        this.item.setControl('onlyGps', this.formTemplateService.fb.control(this.item.get('onlyGps') ? this.item.get('onlyGps').value : false));
        break;

      case 'Area':
        this.item.setControl('level', this.formTemplateService.fb.control(this.item.get('level') ? this.item.get('level').value : 3));
        break;

      case 'File':
        this.item.setControl('number', this.formTemplateService.fb.control(this.item.get('number') ? this.item.get('number').value : 1));
        this.item.setControl('onlyCamera', this.formTemplateService.fb.control(this.item.get('onlyCamera') ? this.item.get('onlyCamera').value : false));
        this.item.setControl('mimeType', this.formTemplateService.fb.control(this.item.get('mimeType') ? this.item.get('mimeType').value : '*'));
        this.item.setControl('waterMark', this.formTemplateService.fb.group(this.item.get('waterMark') ? this.item.get('waterMark').value : { random: false, gps: false, time: false }));
        break;

      case 'Product':
        this.item.setControl('number', this.formTemplateService.fb.control(this.item.get('number') ? this.item.get('number').value : 1));
        this.item.setControl('enableScan', this.formTemplateService.fb.control(this.item.get('enableScan') ? this.item.get('enableScan').value : false));
        break;

      case 'Formula':
        this.item.setControl('formula', this.formTemplateService.fb.control(this.item.get('formula') ? this.item.get('formula').value : ''));
        this.item.setControl('formulaArr', this.formTemplateService.fb.array(this.item.get('formulaArr') ? this.item.get('formulaArr').value : []));
        break;

      default:
        break;
    }
  }

  // 条件信息绑定 · 绑定到显示数据
  private validatorsToViewItem() {
    this.validators = JSON.parse(JSON.stringify(this.formTemplateService.VALIDATORS));
    console.log(this.validators);
    if (!this.parameter.rangeExternal) {
      const index = this.validators.findIndex(v => v.type === 'async');
      this.validators.splice(index, 1);
    }
    const _validators = <FormArray>this.item.controls['validators'];
    _validators.controls.forEach((_ele: FormGroup) => {
      const _item = this.validators.find(v => v.type === _ele.get('type').value);
      if (_item) {
        _item.select = true;
      }
    });
  }

  // 条件信息绑定 · 绑定到数据源
  validatorsChange(vali: ValiDators) {
    const _validators = <FormArray>this.item.controls['validators'];
    if (vali.select) {
      _validators.push(this.formTemplateService.fb.group(vali));
    } else {
      _validators.controls.forEach((ele, index) => {
        if (ele.get('type').value === vali.type) {
          _validators.controls.splice(index, 1);
        }
      });
    }
    _validators.updateValueAndValidity();
  }

}
