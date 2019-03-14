import { ModuleWithProviders, NgModule } from '@angular/core';

import { DirectiveModule } from './core/directive/directive.module';
import { PipeModule } from './core/pipe/pipe.module';

export * from './animations';
export * from './core';

@NgModule({
  exports: [
    DirectiveModule,
    PipeModule
  ]
})
export class NgShareMobileModule {
  /**
   * @deprecated Use `NgShareMobileModule` instead.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgShareMobileModule
    };
  }
}
