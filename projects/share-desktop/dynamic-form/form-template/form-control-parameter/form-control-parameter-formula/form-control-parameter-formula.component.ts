import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormTemplateService } from '../../form-template.service';

@Component({
  selector: 'zc-form-control-parameter-formula',
  templateUrl: './form-control-parameter-formula.component.html',
  styleUrls: ['../../form-template.component.css']
})
export class FormControlParameterFormulaComponent implements OnInit {

  @Input() item: FormGroup;

  // 数值候选列表
  @Input() numbers: Array<any>;

  // 公式编辑器是否开启
  isFormula: Boolean = false;

  constructor(
    public formTemplateService: FormTemplateService,
  ) { }

  ngOnInit() {
  }

  // 清除公式
  cleanFormula(_index: number) {
    const _formulaArr = <FormArray>this.item.controls['formulaArr'];
    if (_index === 0) {
      _formulaArr.controls.splice(0, _formulaArr.controls.length);
      _formulaArr.updateValueAndValidity();
    }
    if (_index === 1) {
      _formulaArr.controls.splice(_formulaArr.controls.length - 1, _formulaArr.controls.length);
      _formulaArr.updateValueAndValidity();
    }
    this.setSeparateFormula();
  }

  // 编写公式
  formulaChange(_type: string, _item: any) {
    console.log(_type, _item);
    const _formulaArr = <FormArray>this.item.controls['formulaArr'];
    const _popList = _formulaArr.at(_formulaArr.controls.length - 1);
    switch (_type) {
      case 'constant':
        if (_popList && _popList.get('type').value === 'constant') {
          _popList.setValue({ label: _popList.get('label').value + _item, key: _popList.get('key').value + _item, type: 'constant', id: 0 });
        } else {
          _formulaArr.push(this.formTemplateService.fb.group({ label: _item, key: _item, type: 'constant', id: 0 }));
        }
        break;

      case 'operator':
        _formulaArr.push(this.formTemplateService.fb.group({ label: _item, key: _item, type: 'operator', id: 0 }));
        break;

      case 'object':
        if (_popList && _popList.get('type').value === 'object') {
          _popList.setValue({ label: _item.name, key: _item.guid, type: 'object', id: _item.id });
        } else {
          _formulaArr.push(this.formTemplateService.fb.group({ label: _item.name, key: _item.guid, type: 'object', id: _item.id }));
        }
        break;

      case 'import':
        if (_item.length > 0) {
          if (_popList && _popList.get('type').value === 'import') {
            _popList.setValue({ label: _item, key: _item, type: 'import', id: 0 });
          } else {
            _formulaArr.push(this.formTemplateService.fb.group({ label: _item, key: _item, type: 'import', id: 0 }));
          }
        }
        break;

      default:
        break;
    }
    this.setSeparateFormula();
  }

  // 分离公式
  private setSeparateFormula() {
    const _formula = this.item.get('formulaArr').value.map(v => v.key).toString().split(',').join('');
    this.item.get('formula').setValue(_formula);
  }

}
