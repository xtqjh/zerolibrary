import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FieldDateRange,
  FieldChoose,
  FieldFile,
  FieldGeography,
  FieldArea,
  FieldProduct,
  ItemForm
} from '../../form-template.service';

@Component({
  selector: 'zc-form-control-input',
  templateUrl: './form-control-input.component.html',
  styleUrls: ['../../form-template.component.css']
})
export class FormControlInputComponent implements OnInit {

  @Input() item:  ItemForm | FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct;

  @Output() resRemove: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
