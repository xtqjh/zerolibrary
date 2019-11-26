import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import {
  FieldDateRange,
  FieldChoose,
  FieldFile,
  FieldGeography,
  FieldArea,
  FieldProduct,
  ItemForm,
  FormTemplateService
} from '../../form-template.service';

@Component({
  selector: 'zc-form-control-switch',
  templateUrl: './form-control-switch.component.html',
  styleUrls: ['../../form-template.component.css']
})
export class FormControlSwitchComponent implements OnInit {

  @Input() fields: FormArray;

  @Input() item: FormGroup;

  @Output() resRemove: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() fieldSelectChange: EventEmitter<string> = new EventEmitter<string>();

  // 控件库
  tempadd: Boolean = false;

  @ViewChild('tempLeftAddwkes') tempLeftAddwkes;

  selectSwitch: String = '';

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
  }

  // 选中控件
  setItemSelect(_item: ItemForm | FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct) {
    console.log('选中控件C');
    this.fields.controls.forEach((_fields: FormGroup) => {
      if (_item.guid === _fields.get('guid').value) {
        if (!_fields.get('select$').value) {
          _fields.get('select$').setValue(true);
          this.fieldSelectChange.emit(_fields.get('guid').value);
        }
      } else {
        _fields.get('select$').setValue(false);

        if (_fields.get('type').value === 'GroupSwitch') {
          const control = <FormArray>_fields.controls['fields'];
          control.controls.forEach((_field, _i: number) => {
            if (_item.guid === _field.get('guid').value) {
              if (!_field.get('select$').value) {
                _field.get('select$').setValue(true);
                this.fieldSelectChange.emit(_field.get('guid').value);
              }
            } else {
              _field.get('select$').setValue(false);
            }
          });
        }
      }
    });
  }

  // 移除控件
  setItemRemove(event: any, _i: number) {
    console.log('移除控件C');
    if (event) {
      const control = <FormArray>this.item.controls['fields'];
      control.controls.splice(_i, 1);
      control.updateValueAndValidity();
      this.fieldSelectChange.emit('');
    }
  }

  // 打开控件库
  openLibraryBoxEs(event: any, _key: string) {
    this.tempadd = !this.tempadd;
    this.selectSwitch = _key;
    console.log('打开控件库C', _key);
    setTimeout(() => {
      this.tempLeftAddwkes.nativeElement.style.bottom = event.target.parentElement.clientHeight - event.target.offsetTop + 40 + 'px';
      this.tempLeftAddwkes.nativeElement.focus();
    }, 200);
  }

  // 控件库返回
  resLibraryChange(event: any) {
    console.log('控件库返回C');
    const _fields = <FormArray>this.item.controls['fields'];
    switch (event.key) {
      case 'Group':
        console.error('switch 中找到了group。。。');
        break;

      default:
        const _contr = this.formTemplateService._createFieldForm(event);
        _contr.addControl('switchCase', this.formTemplateService.fb.group({
          condition: 'EQUAL_TO',
          conditionValues: this.formTemplateService.fb.array([this.selectSwitch].map(_v => this.formTemplateService.fb.control(_v)))
        }));
        _fields.push(_contr);
        _fields.updateValueAndValidity();
        this.setItemSelect(_contr.value);
        break;
    }
    this.tempadd = !this.tempadd;
  }

  isFieldValues(_conditionValues: Array<string>, _key: string) {
    return _conditionValues.find(_v => _v === _key);
  }

  // 指定分支项下是否有控件
  isSwitchFields(_key: string) {
    let isBool = false;
    const _fields = <FormArray>this.item.controls['fields'];
    _fields.controls.forEach((_ele: FormGroup) => {
      const _switch_case = <FormGroup>_ele.controls['switchCase'];
      const _condition_values = <FormArray>_switch_case.controls['conditionValues'];
      _condition_values.controls.forEach((_clc: FormControl) => {
        if (_key === _clc.value) { isBool = true; }
      });
    });
    return isBool;
  }

}
