import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from './environments/environments';
import { ConversionResponse, Currency, CurrencySymbolsResponse } from './models/currency.models';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private key = environment.apiKey;
  private apiURL = 'https://v6.exchangerate-api.com/v6/' + this.key;

  constructor(private http: HttpClient) {}

  getCurrency(): Observable<Currency[]> {
    return this.http.get<CurrencySymbolsResponse>(`${this.apiURL}/codes`).pipe(
      map(response => {
      if (response.result === 'success' && Array.isArray(response.supported_codes)) {
        return response.supported_codes.map(([symbol, name]) => ({
          symbol,
          name
        }));
      } else {
        throw new Error('Failed to load currency symbols');
      }
    }),
    catchError(error => {
      return throwError(() => new Error('Error loading currency symbols'));
    })
  );
  }

  convertCurrency(source: string, destination: string, amount: number) {
    const url = `${this.apiURL}/pair/${source}/${destination}/${amount}`;
    return this.http.get<ConversionResponse>(url).pipe(
      map(response => {
        if (response.result) {
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
