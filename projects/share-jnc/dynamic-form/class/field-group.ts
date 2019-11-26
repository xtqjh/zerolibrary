import {Field} from './field';

export interface FieldGroup extends Field {
  fields: Array<Field>;
  enableRepeat: boolean;
}
