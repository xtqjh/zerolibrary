import {Field} from './field';

export interface FieldDateRange extends Field {
  'showDayCount': boolean;
  'startName': string;
  'endName': string;
  'countName': string;
}
