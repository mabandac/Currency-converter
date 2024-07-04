import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from './environments/environments';
import { ConversionResponse, Currency, CurrencySymbolsResponse } from './models/currency.models';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiURL = 'http://data.fixer.io/api/';
  private key = environment.accessKey;

  constructor(private http: HttpClient) {}

  getCurrency(): Observable<Currency[]> {
    return this.http.get<CurrencySymbolsResponse>(`${this.apiURL}symbols?access_key=${this.key}`).pipe(
      map(response => {
      if (response.success) {
        return Object.keys(response.symbols).map(key => ({
          symbol: key,
          name: response.symbols[key]
        }));
      } else {
        throw new Error('Failed to load currency symbols');
      }
    }),
    catchError(error => {
      console.error('Error loading currency symbols:', error);
      return throwError(() => new Error('Error loading currency symbols'));
    })
  );
  }

  convertCurrency(source: string, destination: string, amount: number) {
    const url = `${this.apiURL}convert?access_key=${this.key}&from=${source}&to=${destination}&amount=${amount}`;
    return this.http.get<ConversionResponse>(url).pipe(
      map(response => {
        if (response.success) {
          return response;
        } else {
          throw new Error('Failed to convert currency');
        }
      }),
      catchError(error => {
        console.error('Error converting currency:', error);
        return throwError(() => new Error('Error converting currency'));
      })
    );

  }
}
