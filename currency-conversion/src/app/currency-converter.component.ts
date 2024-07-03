import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Currency } from './models/currency.interface';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverter implements OnInit {
  currencyData : Currency[] = [];


  constructor(
    private currencyService : CurrencyService
  ) {}
   ngOnInit(): void {
    this.currencyService.getCurrency().subscribe(
      (data) => {
        if (data.success) {
          this.currencyData = Object.keys(data.symbols).map(key => ({
            symbol: key,
            name: data.symbols[key]
          }));
        }
      },
    );
     
   }

}
