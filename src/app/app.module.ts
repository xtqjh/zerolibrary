import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
// import { NgShareDesktopModule } from 'ng-share-desktop';
// import { NgShareDesktopModule } from '../../projects/share-desktop/ng-share-desktop.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { environment } from 'src/environments/environment';
import { NgShareJncModule } from 'ng-share-jnc';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    // NgShareDesktopModule.forRoot(),
    NgShareJncModule.forRoot({ GatewayUrl: environment.GatewayUrl, Production: environment.production, DebugToken: environment.DebugToken }),
    AppRoutingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
