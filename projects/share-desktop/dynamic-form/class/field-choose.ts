import {Field} from './field';

export interface FieldChoose extends Field {
  candidates: Array<String>;
  number: number;
}
