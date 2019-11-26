import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Field} from '../../class/field';
import {FieldValue} from '../../class/field-value';

@Component({
  selector: 'zc-field-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Input() field: Field;

  @Output() valueChange = new EventEmitter<Array<FieldValue>>();

  constructor() {
  }

  ngOnInit() {

  }

  fieldType(field: Field) {
    switch (field.type) {
      case 'Integer':
      case 'Number':
      case 'Double':
        return 'number';
      default :
        return 'text';
    }
  }

  ngValueChanges(value): void {
    this.valueChange.emit([{
      fieldId: this.field.id,
      type: this.field.supportType,
      value: value.target.value
    }]);
  }
}
