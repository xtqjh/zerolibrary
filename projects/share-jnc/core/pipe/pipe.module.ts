import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { ChannelColorPipe } from './channel-color.pipe';
import { ConvertStatusPipe } from './convert-status.pipe';
import { DigitUppercasePipe } from './digit-uppercase.pipe';
import { ObjectToArrayPipe } from './object-to-array.pipe';
import { OrderByPipe } from './order-by.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SearchListPipe } from './search-list.pipe';



const PIPE = [
  ChannelColorPipe,
  ConvertStatusPipe,
  DigitUppercasePipe,
  ObjectToArrayPipe,
  OrderByPipe,
  SafeHtmlPipe,
  SearchListPipe
];

@NgModule({
  exports: [...PIPE],
  declarations: [...PIPE],
  imports: [PlatformModule]
})
export class PipeModule { }
