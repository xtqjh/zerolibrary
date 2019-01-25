import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldValue } from '../class/field-value';
import { FieldGroup } from '../class/field-group';

@Component({
  selector: 'zc-form-post-fields',
  templateUrl: './form-post-fields.component.html'
})
export class FormPostFieldsComponent implements OnInit {

  private _fields: Array<FieldGroup>;
  @Input() set fields(_data: Array<FieldGroup>) {
    this._fields = _data;
    if (_data) { this.onFieldsData(); }
  }
  get fields() { return this._fields; }

  @Output() valueChange = new EventEmitter<Array<FieldValue>>();

  values: Array<FieldValue> = [];

  constructor() {

  }

  ngOnInit() {
  }

  private onFieldsData() {
    console.log(this._fields);
    this._fields.forEach((_ele: FieldGroup) => {
      this.values.push({
        fieldId: _ele.id,
        type: _ele.supportType,
        value: _ele.fields.map(field => {
          return {
            fieldId: field.id,
            type: field.type,
            value: null
          };
        })
      });
    });
    console.log(this.values);
  }

  onValueChanges(fieldValues: Array<FieldValue>, index: number) {
    fieldValues
      // .filter(v => !!v)
      .forEach(v => {
        const gv = this.values[index];
        const vs: Array<FieldValue> = gv.value;
        const i = vs.findIndex(f => f.fieldId === v.fieldId);
        if (i < 0) {
          vs.push(v);
        } else {
          vs[i] = v;
        }
      });
    this.valueChange.emit(this.values);
  }


}
