import {Validator} from './validator';

export interface Field {
  'type': string;
  'id': number;
  'name': string;
  'status': number;
  'validators': Array<Validator>;
  'explain': string;
  'placeholder': string;
  'supportType': string;
  'value': any;
}
