import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field} from '../../class/field';
import {FieldValue} from '../../class/field-value';

@Component({
  selector: 'zc-field-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  @Input() field: Field;
  @Output() valueChange = new EventEmitter<Array<FieldValue>>();

  constructor() {
  }

  ngOnInit() {
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
    this.valueChange.emit([{
      fieldId: this.field.id,
      type: this.field.supportType,
      value: result
    }]);
  }

}
