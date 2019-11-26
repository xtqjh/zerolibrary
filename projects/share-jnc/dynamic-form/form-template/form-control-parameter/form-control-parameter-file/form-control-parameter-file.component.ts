import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormTemplateService, SelectValue } from '../../form-template.service';

@Component({
  selector: 'zc-form-control-parameter-file',
  templateUrl: './form-control-parameter-file.component.html',
  styleUrls: ['../../form-template.component.css']
})
export class FormControlParameterFileComponent implements OnInit {

  @Input() item: FormGroup;

  // 文件类型
  file_type_list: Array<SelectValue> = this.formTemplateService.FILE_TYPE;

  constructor(
    private formTemplateService: FormTemplateService,
  ) { }

  ngOnInit() {
  }

}
