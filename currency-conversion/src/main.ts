import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CurrencyConverterModule } from './app/currency-converter.module';


platformBrowserDynamic().bootstrapModule(CurrencyConverterModule)
  .catch(err => console.error(err));
