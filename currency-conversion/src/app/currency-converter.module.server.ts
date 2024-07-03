import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { CurrencyConverterModule } from './currency-converter.module';
import { CurrencyConverter } from './currency-converter.component';

@NgModule({
  imports: [
    CurrencyConverterModule,
    ServerModule,
  ],
  bootstrap: [CurrencyConverter],
})
export class AppServerModule {}
