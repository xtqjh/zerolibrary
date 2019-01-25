import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldFile } from '../../form-template.service';

@Component({
  selector: 'zc-form-control-file',
  templateUrl: './form-control-file.component.html',
  styleUrls: ['../../form-template.component.css']
})
export class FormControlFileComponent implements OnInit {

  @Input() item:  FieldFile ;

  @Output() resRemove: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
