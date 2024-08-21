import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Currency } from './models/currency.models';
import { ReplaySubject, Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverter implements OnInit {
  currencyData : Currency[] = [];
  convertedAmount: number = 0;
  conversionRate: number = 0;
  amount: number | null = null;
  source: string = '';
  destination: string = '';

 private destroyed$ = new ReplaySubject<void>();
 private amountInput$ = new Subject<number | null>();


  constructor(
    private currencyService : CurrencyService
  ) {}

   ngOnInit(): void {
    this.currencyService.getCurrency().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data) => {
      this.currencyData = data;
    });

   }

   onAmountChange(): void {
    this.amountInput$.next(this.amount);
    this.convert();
  }

  convert(): void {
    if (this.source && this.destination && this.amount !== null) {
      this.currencyService.convertCurrency(this.source, this.destination, this.amount).pipe(
        debounceTime(2000),
        takeUntil(this.destroyed$)
      ).subscribe(
        (conversionResult) => {
          if (conversionResult.result === 'success') {
            this.convertedAmount = conversionResult.conversion_result;
            this.conversionRate = conversionResult.conversion_rate;
          }
        }
      );
    }
  }

  

   ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
