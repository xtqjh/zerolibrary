import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field} from '../../class/field';
import {FieldValue} from '../../class/field-value';

@Component({
  selector: 'zc-field-text-area',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextAreaComponent implements OnInit {
  @Input() field: Field;
  @Output() valueChange = new EventEmitter<Array<FieldValue>>();

  constructor() {
  }

  ngOnInit() {
  }

  ngValueChanges(value): void {
    this.valueChange.emit([{
      fieldId: this.field.id,
      type: this.field.supportType,
      value: value.target.value
    }]);
  }
}
