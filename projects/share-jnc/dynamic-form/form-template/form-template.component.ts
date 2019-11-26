import { Component, OnInit, ViewChild, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import {
  FormTemplateService,
  FieldDateRange,
  FieldChoose,
  FieldFile,
  FieldGeography,
  FieldArea,
  FieldProduct,
  FieldFormula,
  ItemForm,
  GroupForm,
  GroupSwitchForm,
  Parameter
} from './form-template.service';

@Component({
  selector: 'zc-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css'],
  providers: [FormTemplateService]
})
export class FormTemplateComponent implements OnInit {

  private parameter$: Parameter = {
    // 控件库是否加载套件数据
    external: false,
    // 是否在套件范围
    rangeExternal: false
  };
  @Input() set parameter(data: Parameter) {
    if (data) {
      Object.assign(this.parameter$, data);
    }
  }
  get parameter() { return this.parameter$; }

  @Input() set items(_data: any) {
    if (_data) {
      this.submitStatus = false;
      this.dynForm = this.formTemplateService._createForm();
      this.dynForm.patchValue(_data);
      this.setControls(_data);
    }
  }
  @Output() itemsChange: EventEmitter<any> = new EventEmitter<any>();

  // 提交状态
  submitStatus: Boolean = false;

  // 表单状态
  dynFormStatus: Boolean = true;

  // 表单
  dynForm: FormGroup = this.formTemplateService._createForm();

  // 控件库
  tempadd: Boolean = false;

  // 控件属性编辑
  tempedit: String = '';

  @ViewChild('tempLeftAddwk') tempLeftAddwk;

  @ViewChild('formControlIndex') formControlIndex;

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
  }

  // 数据初始化绑定
  private setControlsFields(_sls) {
    const _item = this.formTemplateService._createFieldForm({ txt: _sls.name, key: _sls.type, icon: '' });
    _item.patchValue(_sls);
    _item.removeControl('validators');
    _item.addControl('validators', this.formTemplateService.fb.array(_sls.validators.map(_v => this.formTemplateService.fb.group(_v))));

    switch (_sls.type) {
      case 'SingleChoose': case 'Choose': case 'Boolean':
        const _choose: FieldChoose = <FieldChoose>_sls;
        _item.addControl('candidates', this.formTemplateService.fb.array(_choose.candidates));
        _item.addControl('number', this.formTemplateService.fb.control(_choose.number || 1));
        break;

      case 'DateRange':
        const _date_range: FieldDateRange = <FieldDateRange>_sls;
        _item.addControl('showDayCount', this.formTemplateService.fb.control(_date_range.showDayCount || false));
        _item.addControl('startName', this.formTemplateService.fb.control(_date_range.startName || '开始时间显示名称'));
        _item.addControl('endName', this.formTemplateService.fb.control(_date_range.endName || '结束时间显示名称'));
        _item.addControl('countName', this.formTemplateService.fb.control(_date_range.countName || '显示天数名称'));
        _item.addControl('level', this.formTemplateService.fb.control(_date_range.level || 3));
        break;

      case 'Geography':
        const _geography: FieldGeography = <FieldGeography>_sls;
        _item.addControl('onlyGps', this.formTemplateService.fb.control(_geography.onlyGps || false));
        break;

      case 'Area':
        const _area: FieldArea = <FieldArea>_sls;
        _item.addControl('level', this.formTemplateService.fb.control(_area.level || 3));
        break;

      case 'File':
        const _file: FieldFile = <FieldFile>_sls;
        _item.addControl('number', this.formTemplateService.fb.control(_file.number || 1));
        _item.addControl('onlyCamera', this.formTemplateService.fb.control(_file.onlyCamera || false));
        _item.addControl('waterMark', this.formTemplateService.fb.control(_file.waterMark || { random: false, gps: false, time: false }));
        _item.addControl('mimeType', this.formTemplateService.fb.control(_file.mimeType || '*'));
        break;

      case 'Product':
        const _product: FieldProduct = <FieldProduct>_sls;
        _item.addControl('number', this.formTemplateService.fb.control(_product.number || 1));
        _item.addControl('enableScan', this.formTemplateService.fb.control(_product.enableScan || false));
        break;

      case 'Formula':
        const _formula: FieldFormula = <FieldFormula>_sls;
        _item.addControl('formula', this.formTemplateService.fb.control(_formula.formula || ''));
        _item.addControl('formulaArr', this.formTemplateService.fb.array(_formula.formulaArr.map(_v => this.formTemplateService.fb.group(_v))));
        break;

      default:
        break;
    }

    return _item;
  }

  // 数据初始化绑定
  private setControls(_data: any) {
    const _field_control = <FormArray>this.dynForm.controls['fields'];
    _data['fields'].forEach((_ele: GroupForm | GroupSwitchForm | FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct | ItemForm) => {
      let _group;
      if (!_ele.type) {
        _ele.type = _ele.supportType;
        _ele.guid = this.formTemplateService.isGuid(16);
      }
      if (_ele.type === 'Group') {
        _group = this.formTemplateService._createGroupForm();
        _group.patchValue(_ele);
        const _group_control = <FormArray>_group.controls['fields'];
        _ele['fields'].forEach((_sls: FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct | ItemForm) => {
          _group_control.push(this.setControlsFields(_sls));
        });
      } else if (_ele.type === 'GroupSwitch') {
        _group = this.formTemplateService._createGroupForm();
        _group.patchValue(_ele);
        _group.addControl('conditionField', this.formTemplateService.fb.group({
          name: _ele['conditionField']['name'],
          type: _ele['conditionField']['type'],
          placeholder: _ele['conditionField']['placeholder'],
          candidates: this.formTemplateService.fb.array(_ele['conditionField']['candidates'].map(v => this.formTemplateService.fb.control(v)))
        }));
        const _group_control = <FormArray>_group.controls['fields'];
        _ele['fields'].forEach((_sls: FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct | ItemForm) => {
          const _cfi = this.setControlsFields(_sls);
          _cfi.addControl('switchCase', this.formTemplateService.fb.group({
            condition: _sls.switchCase.condition,
            conditionValues: this.formTemplateService.fb.array(_sls.switchCase.conditionValues.map(v => this.formTemplateService.fb.control(v)))
          }));
          _group_control.push(_cfi);
        });
      } else if (_ele.type === 'GroupSuite') {
        _group = this.formTemplateService._createGroupForm();
        _group.patchValue(_ele);
        const _group_fields = <FormArray>_group.controls['fields'];
        _ele['fields'].forEach((_fields: FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct | ItemForm) => {
          _group_fields.push(this.setControlsFields(_fields));
        });
      } else {
        _group = this.setControlsFields(_ele);
      }
      _field_control.push(_group);
    });
  }

  // 打开控件库
  openLibraryBox() {
    this.tempadd = !this.tempadd;
    setTimeout(() => {
      this.tempLeftAddwk.nativeElement.focus();
    }, 500);
  }

  // 控件库返回
  resLibraryChange(event: any) {
    console.log('控件库返回A');
    const _fields = <FormArray>this.dynForm.controls['fields'];
    switch (event.key) {
      case 'Group':
        const _group = this.formTemplateService._createGroupForm();
        _group.get('name').setValue(event.txt);
        _fields.push(_group);
        _fields.updateValueAndValidity();
        this.formControlIndex.setItemSelect(_group.value);
        break;

      case 'GroupSwitch':
        const _group_switch = this.formTemplateService._createGroupForm();
        _group_switch.get('name').setValue(event.txt);
        _group_switch.get('type').setValue('GroupSwitch');
        _group_switch.get('enableRepeat').setValue(false);
        _group_switch.addControl('conditionField', this.formTemplateService.fb.group({
          name: event.txt,
          type: 'SingleChoose',
          placeholder: '请输入',
          candidates: this.formTemplateService.fb.array(['条件一', '条件二'].map(v => this.formTemplateService.fb.control(v)))
        }));
        _fields.push(_group_switch);
        _fields.updateValueAndValidity();
        this.formControlIndex.setItemSelect(_group_switch.value);
        break;

      case 'GroupSuite':
        const _group_suite = this.formTemplateService._createGroupForm();
        _group_suite.get('name').setValue(event.txt);
        _group_suite.get('type').setValue('GroupSuite');
        const _group_suite_fields = <FormArray>_group_suite.controls['fields'];
        event.fields.forEach(fields => {
          _group_suite_fields.controls.push(this.setControlsFields(fields));
        });
        _fields.push(_group_suite);
        _fields.updateValueAndValidity();
        this.formControlIndex.setItemSelect(_group_suite.value);
        break;

      default:
        const _contr = this.formTemplateService._createFieldForm(event);
        _fields.push(_contr);
        _fields.updateValueAndValidity();
        this.formControlIndex.setItemSelect(_contr.value);
        break;
    }
    this.tempadd = false;
  }

  // 模板设置返回
  resItemChange(event: any) {
    this.dynForm.patchValue(event);
    this.dynForm.updateValueAndValidity();
  }

  onSubmit() {
    this.submitStatus = true;
    this.itemsChange.emit(this.dynForm.value);
  }

}
