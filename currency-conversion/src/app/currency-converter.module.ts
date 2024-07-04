import { NgModule } from '@angular/core';
import { CurrencyConverter } from './currency-converter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  bootstrap: [CurrencyConverter]
})
export class CurrencyConverterModule { }
