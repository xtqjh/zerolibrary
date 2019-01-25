import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class FormTemplateService {

  // 控件类型
  SELECT_VALUE: Array<SelectValue> = [
    { txt: '文本', key: 'Single', icon: 'icon-wenben1' },
    { txt: '多行文本', key: 'Multi', icon: 'icon-duohangwenben' },
    { txt: '富文本', key: 'Rich', icon: 'icon-wenzi' },
    { txt: '数字', key: 'Number', icon: 'icon-shuzi' },
    { txt: '日期', key: 'Date', icon: 'icon-riqi1' },
    { txt: '起止时间', key: 'DateRange', icon: 'icon-riqi' },
    { txt: '单选', key: 'SingleChoose', icon: 'icon-mg-radio2' },
    { txt: '多选', key: 'Choose', icon: 'icon-duoxuan' },
    { txt: '图片', key: 'Image', icon: 'icon-img' },
    { txt: '地区', key: 'Area', icon: 'icon-hangzhengzhifaquyushezhi' },
    { txt: '产品', key: 'Product', icon: 'icon-chanpinxinxi' },
    { txt: '客户', key: 'Customer', icon: 'icon-yuangong' },
    { txt: '公司', key: 'Company', icon: 'icon-qiyebangonglou' },
    { txt: '二元', key: 'Boolean', icon: 'icon-huakuai-no' },
    { txt: '文件', key: 'File', icon: 'icon-wenjian' },
    { txt: '地图', key: 'Geography', icon: 'icon-quyudingwei' },
    { txt: '明细', key: 'Group', icon: 'icon-mingxi' },
    { txt: '计算公式', key: 'Formula', icon: 'icon-renwu' },
    { txt: '分支', key: 'GroupSwitch', icon: 'icon-guanxi' },
  ];

  // 验证
  VALIDATORS: Array<ValiDators> = [
    { type: 'required', label: '必填', message: '不能为空', select: false },
    { type: 'confirm', label: '确认', message: '需要确认', select: false },
    { type: 'async', label: '异步校验', message: '通过url异步校验数据', select: false, validUrl: null, method: 'POST', body: { param: null } }
  ];

  // 分支的条件判断类型
  SWITCH_CASECONDITION: Array<SelectValue> = [
    { txt: '等于', key: 'EQUAL_TO', icon: 'icon-wenben1' },
    { txt: '大于', key: 'GREATER_THAN', icon: 'icon-wenben1' },
    { txt: '小于', key: 'LESS_THAN', icon: 'icon-wenben1' },
    { txt: '介于', key: 'BETWEEN_AND', icon: 'icon-wenben1' },
    { txt: '包含', key: 'INCLUDE', icon: 'icon-wenben1' },
    { txt: '非包含', key: 'NOT_INCLUDE', icon: 'icon-wenben1' },
  ];

  // 文件类型
  FILE_TYPE: Array<SelectValue> = [
    { txt: '不限制', key: '*', icon: 'icon-wenben1' },
    { txt: '图片', key: 'image/*', icon: 'icon-wenben1' },
    { txt: '视频', key: 'video/*', icon: 'icon-wenben1' },
    { txt: '音频', key: 'audio/*', icon: 'icon-wenben1' },
    { txt: 'pdf文档', key: 'document/pdf', icon: 'icon-wenben1' },
    { txt: 'word文档', key: 'document/word', icon: 'icon-wenben1' },
    { txt: 'excel工作表', key: 'document/excel', icon: 'icon-wenben1' },
    { txt: '压缩包', key: 'zip/*', icon: 'icon-wenben1' },
  ];

  constructor(
    public fb: FormBuilder
  ) { }

  /**
   * form
   */
  _createForm() {
    return this.fb.group({
      id: 0,
      name: ['未定义模板名称', Validators.required],
      type: '',
      icon: '',
      fields: this.fb.array([])
    });
  }

  /**
   * group
   */
  _createGroupForm() {
    return this.fb.group({
      id: 0,
      name: ['', Validators.required],
      guid: this.isGuid(16),
      enableRepeat: true, // 循环添加
      type: 'Group',
      fields: this.fb.array([]),
      select$: false,
      alias: null
    });
  }

  /**
   * field
   */
  _createFieldForm(_data: SelectValue) {
    return this.fb.group({
      id: 0,
      name: [_data.txt, Validators.required],
      guid: this.isGuid(16),
      type: _data.key,
      placeholder: '请输入',
      validators: this.fb.array([]),
      select$: _data.select || false,
      alias: null
    });
  }

  /**
   * Guid
   * @param size 长度
   */
  isGuid(size: number) {
    let guid = '';
    for (let i = 1; i <= size; i++) {
      const n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
    }
    return guid;
  }

  /**
   * 是否是数学公式
   */
  isFormula(string) {
    // 剔除空白符
    string = string.replace(/\s/g, '');

    // 错误情况，空字符串
    if ('' === string) {
      return false;
    }

    // 错误情况，运算符连续
    if (/[\+\-\*\/]{2,}/.test(string)) {
      return false;
    }

    // 空括号
    if (/ /.test(string)) {
      return false;
    }

    // 错误情况，括号不配对
    const stack = [];
    for (let i = 0, item; i < string.length; i++) {
      item = string.charAt(i);
      if ('(' === item) {
        stack.push('(');
      } else if (')' === item) {
        if (stack.length > 0) {
          stack.pop();
        } else {
          return false;
        }
      }
    }
    if (0 !== stack.length) {
      return false;
    }

    // 错误情况，(后面是运算符
    if (/\([\+\-\*\/\=\<\>\≠\≤\≥]/.test(string)) {
      return false;
    }

    // 错误情况，)前面是运算符
    if (/[\+\-\*\/\=\<\>\≠\≤\≥]\)/.test(string)) {
      return false;
    }

    // 错误情况，(前面不是运算符
    if (/[^\p{IF}\p{SUM}\+\-\*\/\=\<\>\≠\≤\≥]\(/.test(string)) {
      return false;
    }

    // 错误情况，)后面不是运算符
    if (/\)[^\p{IF}\p{SUM}\+\-\*\/\=\<\>\≠\≤\≥]/.test(string)) {
      return false;
    }
    return true;
  }

}

/**
 * 类型
 */
export interface SelectValue {
  txt: string;
  key: string;
  icon?: string;
  select?: boolean;
  fields?: Array<any>;
}

/**
 * 验证类型
 */
export interface ValiDators {
  type: string;
  label: string;
  message: string;
  select?: boolean;
  validUrl?: string;
  method?: string;
  body?: { [key: string]: string };
  resultType?: string;
}

/**
 * 组
 */
export interface GroupForm {
  name: string;
  type: string;
  // 在填写表单的时候是否允许重复添加
  enableRepeat: boolean;
  fields: Array<FieldChoose | FieldDateRange | FieldGeography | FieldArea | FieldFile | FieldProduct | ItemForm>;
  id?: number;
  select$?: boolean; // 选中
  guid?: string;
  supportType?: string;
  // alias?: string; // 别名
}

/**
 * 带条件分支的组
 */
export interface GroupSwitchForm extends GroupForm {
  // 条件判断的字段,目前支持 单选(SingleChoose)
  conditionField: ItemForm;
}

/**
 * 组里面的表单
 */
export interface ItemForm {
  name: string;
  type: string;
  // 描述信息
  placeholder: string;
  // 验证
  validators: Array<ValiDators>;
  id?: number;
  status?: number;
  // 分支的条件判断
  switchCase?: {
    // 判断方式,取值范围
    condition: string;
    // 分支的值,字符串数组
    conditionValues: Array<string>;
  };
  select$?: boolean; // 选中
  guid?: string;
  supportType?: string;
  alias?: string; // 别名
}

/**
 * 选择
 * 注意：二元选择候选值,有且仅有两个选项，默认为["否","是"]
 */
export interface FieldChoose extends ItemForm {
  // 候选词列表
  candidates: Array<string>;
  // 选择数量，当多选时有效
  number: number;
}

/**
 * 日期范围
 */
export interface FieldDateRange extends ItemForm {
  // 是否显示
  showDayCount: boolean;
  // 开始时间显示名称
  startName?: string;
  // 结束时间显示名称
  endName?: string;
  // 显示天数的名称
  countName?: string;
  // 单位等级:年(1),月(2),日(3),半天(4),时(5),分(7),秒(8)；默认为：日（3）
  level: number;
}

/**
 * 地理位置
 */
export interface FieldGeography extends ItemForm {
  // 是否只允许启用gps定位当前位置,如果为false,则可以在地图上选择坐标
  onlyGps: boolean;
}

/**
 * 地区
 */
export interface FieldArea extends ItemForm {
  // 地区的等级，范围（1，2，3，4），默认为3
  level: number;
}

/**
 * 文件选择
 */
export interface FieldFile extends ItemForm {
  // 文件上传的数量
  number: number;
  // 只允许使用摄像头
  onlyCamera?: boolean;
  // 水印配置{"random": true,"gps": true,"time": true}
  waterMark?: {
    // 水印是否添加随机码
    random: boolean;
    // 水印是否添加gps经纬度
    gps: boolean;
    // 水印是否添加时间
    time: boolean;
  };
  // 指定文件类型,不限制为*;例如所有图片image/*
  mimeType?: string;
}

/**
 * 产品选择
 */
export interface FieldProduct extends ItemForm {
  // 允许产品选择的个数,默认为1
  number: number;
  // 是否允许扫描条形码
  enableScan: boolean;
}

/**
 * 计算公式
 */
export interface FieldFormula extends ItemForm {
  // 公式
  formula: string;
  formulaArr: Array<any>;
}

/**
 * 组件参数
 */
export interface Parameter {
  // 控件库是否加载套件数据
  external?: boolean;
  // 是否在套件范围
  rangeExternal?: boolean;
}

