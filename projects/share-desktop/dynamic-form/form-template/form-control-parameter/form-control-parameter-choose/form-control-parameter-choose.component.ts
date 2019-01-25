import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormTemplateService } from '../../form-template.service';

@Component({
  selector: 'zc-form-control-parameter-choose',
  templateUrl: './form-control-parameter-choose.component.html',
  styleUrls: ['../../form-template.component.css']
})
export class FormControlParameterChooseComponent implements OnInit {

  @Input() item: FormGroup;

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
  }

  // 删除选择项 单选、多选
  delCandidates(_index: number) {
    const _candidates$ = <FormArray>this.item.controls['candidates$'];
    _candidates$.controls.splice(_index, 1);
    _candidates$.updateValueAndValidity();
    this.candidatesChange();
  }

  // 添加选择项 单选、多选
  addCandidates() {
    const _candidates$ = <FormArray>this.item.controls['candidates$'];
    _candidates$.push(this.formTemplateService.fb.group({ value: '选项' }));
    this.candidatesChange();
  }

  // 选项值绑定 单选、多选
  candidatesChange() {
    setTimeout(() => {
      this.item.setControl('candidates', this.formTemplateService.fb.array([]));
      const _candidates = <FormArray>this.item.controls['candidates'];
      const _candidates$ = <FormArray>this.item.controls['candidates$'];
      _candidates$.controls.forEach((_ele: FormGroup) => {
        _candidates.push(this.formTemplateService.fb.control(_ele.get('value').value));
      });
    }, 300);
  }

}
