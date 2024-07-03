import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiURL = 'http://data.fixer.io/api/';
  private key = environment.accessKey;

    constructor(private http: HttpClient) {}
  
    getCurrency(): Observable<any> {
      return this.http.get<any>(`${this.apiURL}symbols?access_key=${this.key}`);
    }
}
