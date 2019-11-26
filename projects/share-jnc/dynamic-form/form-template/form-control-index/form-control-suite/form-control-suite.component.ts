import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
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
  selector: 'zc-form-control-suite',
  templateUrl: './form-control-suite.component.html',
  styleUrls: ['../../form-template.component.css']
})
export class FormControlSuiteComponent implements OnInit {

  @Input() fields: FormArray;

  @Input() item: FormGroup;

  @Output() resRemove: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() fieldSelectChange: EventEmitter<string> = new EventEmitter<string>();

  // 控件库
  tempadd: Boolean = false;

  @ViewChild('tempLeftAddwkes') tempLeftAddwkes;

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
  }

  // 选中控件
  setItemSelect(_item: ItemForm | FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct) {
    console.log('选中控件D');
    this.fields.controls.forEach((_fields: FormGroup) => {
      if (_item.guid === _fields.get('guid').value) {
        if (!_fields.get('select$').value) {
          _fields.get('select$').setValue(true);
          this.fieldSelectChange.emit(_fields.get('guid').value);
        }
      } else {
        _fields.get('select$').setValue(false);

        if (_fields.get('type').value === 'Group') {
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
    console.log('移除控件D');
    if (event) {
      const control = <FormArray>this.item.controls['fields'];
      control.controls.splice(_i, 1);
      control.updateValueAndValidity();
      this.fieldSelectChange.emit('');
    }
  }

  // 打开控件库
  openLibraryBoxEs() {
    this.tempadd = !this.tempadd;
    console.log('打开控件库D', this.tempadd);
    setTimeout(() => {
      this.tempLeftAddwkes.nativeElement.focus();
    }, 500);
  }

  // 控件库返回
  resLibraryChange(event: any) {
    console.log('控件库返回D');
    const _fields = <FormArray>this.item.controls['fields'];
    switch (event.key) {
      case 'Group':
        const _group = this.formTemplateService._createGroupForm();
        _group.get('name').setValue(event.txt);
        _fields.push(_group);
        _fields.updateValueAndValidity();
        this.setItemSelect(_group.value);
        break;

      default:
        const _contr = this.formTemplateService._createFieldForm(event);
        _fields.push(_contr);
        _fields.updateValueAndValidity();
        this.setItemSelect(_contr.value);
        break;
    }
    this.tempadd = !this.tempadd;
  }

}
