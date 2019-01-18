import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { PipeModule } from '../core/pipe/pipe.module';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ChannelPipe } from './channel.pipe';

@NgModule({
  declarations: [ProductModalComponent, ChannelPipe],
  exports: [ProductModalComponent, ChannelPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgZorroAntdModule,
    MalihuScrollbarModule.forRoot(),
    PipeModule
  ]
})
export class ProductModule { }
