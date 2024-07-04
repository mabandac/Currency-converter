import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Currency } from './models/currency.interface';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverter implements OnInit {
  currencyData : Currency[] = [];
  convertedAmount: number = 0;
  conversionRate: number = 0;
  amount: number = 0;
  source: string = '';
  destination: string = '';

 private destroyed$ = new ReplaySubject<void>();


  constructor(
    private currencyService : CurrencyService
  ) {}

   ngOnInit(): void {
    this.currencyService.getCurrency().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data) => {
      if (data.success) {
        this.currencyData = Object.keys(data.symbols).map(key => ({
          symbol: key,
          name: data.symbols[key]
        }));
      }
    });
   }

   convert() {
    if(this.source && this.destination && this.amount){
      this.currencyService.convertCurrency(this.source, this.destination, this.amount).pipe(
        takeUntil(this.destroyed$)
      ).subscribe(
        (conversionResult) => {
          if(conversionResult.success) {
            this.convertedAmount = conversionResult.result;
            this.conversionRate = conversionResult.info.rate;
          }
        },
      )
    }
   }

   ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
