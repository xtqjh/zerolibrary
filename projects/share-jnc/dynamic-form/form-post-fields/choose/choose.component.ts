import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field} from '../../class/field';
import {FieldChoose} from '../../class/field-choose';
import {FieldValue} from '../../class/field-value';

@Component({
  selector: 'zc-field-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {
  @Input() field: FieldChoose;
  number = 1;
  @Output() valueChange = new EventEmitter<Array<FieldValue>>();

  constructor() {
  }

  ngOnInit() {
    this.number = this.field.number || 0;
  }

  ngValueChanges(value): void {
    this.valueChange.emit([{
      fieldId: this.field.id,
      type: this.field.supportType,
      value: this.number === 1 ? value[0] : value
    }]);
  }
}
