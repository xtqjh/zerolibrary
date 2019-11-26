import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {
  GroupForm,
  FieldDateRange,
  FieldChoose,
  FieldFile,
  FieldGeography,
  FieldArea,
  FieldProduct,
  ItemForm,
  GroupSwitchForm,
  Parameter
} from '../form-template.service';

@Component({
  selector: 'zc-form-control-index',
  templateUrl: './form-control-index.component.html',
  styleUrls: ['../form-template.component.css']
})
export class FormControlIndexComponent implements OnInit {

  @Input() parameter: Parameter;

  // @Input() fields: Array<GroupForm | GroupSwitchForm | ItemForm | FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct>;
  @Input() fields: FormArray;

  @Output() fieldSelectChange: EventEmitter<string> = new EventEmitter<string>();

  fieldSelect: string;

  constructor() { }

  ngOnInit() {
  }

  // 选中控件
  setItemSelect(_item: GroupForm | GroupSwitchForm | ItemForm | FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct, _index: number) {
    console.log('选中控件A');
    this.fields.controls.forEach((fields: FormGroup, _i: number) => {
      if (_item.guid === fields.get('guid').value) {
        if (!fields.get('select$').value) {
          fields.get('select$').setValue(true);
          this.fieldSelectChange.emit(fields.get('guid').value);
        }
      } else {
        fields.get('select$').setValue(false);

        if (fields.get('type').value === 'Group') {
          const control = <FormArray>fields.controls['fields'];
          control.controls.forEach((_field, _k: number) => {
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
    if (event) {
      this.fields.controls.splice(_i, 1);
      this.fields.updateValueAndValidity();
      this.fieldSelectChange.emit('');
    }
  }

}
