import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { WindowOpenDirective } from './window-open.directive';
import { WindowCloseDirective } from './window-close.directive';
import { LoadingDirective } from './loading.directive';
import { RepeatClickDirective } from './repeat-click.directive';
import { DragDirective } from './drag.directive';
import { ScalingDirective } from './scaling.directive';
import { PlayerDirective } from './player.directive';


const DIRECTIVE = [
  WindowOpenDirective,
  WindowCloseDirective,
  LoadingDirective,
  RepeatClickDirective,
  DragDirective,
  ScalingDirective,
  PlayerDirective
];

@NgModule({
  exports: [...DIRECTIVE],
  declarations: [...DIRECTIVE],
  imports: [PlatformModule]
})
export class DirectiveModule { }
