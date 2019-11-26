import {Field} from './field';

export interface FieldFile extends Field {
  number: number;
  onlyCamera: boolean;
  waterMark: {
    random: boolean;
    gps: boolean;
    time: boolean;
  };
  mimeType: string;
}
