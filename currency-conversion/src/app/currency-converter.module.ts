import { NgModule } from '@angular/core';
import { CurrencyConverter } from './currency-converter.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    CurrencyConverter
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [CurrencyConverter]
})
export class CurrencyConverterModule { }
