import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyConverter} from './currency-converter.component';
import { CurrencyService } from './currency.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Currency } from './models/currency.models';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverter;
  let fixture: ComponentFixture<CurrencyConverter>;
  let currencyService: jasmine.SpyObj<CurrencyService>;

  beforeEach(async () => {
    const currencyServiceSpy = jasmine.createSpyObj('CurrencyService', ['getCurrency', 'convertCurrency']);

    await TestBed.configureTestingModule({
      declarations: [CurrencyConverter],
      imports: [FormsModule],
      providers: [
        { provide: CurrencyService, useValue: currencyServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConverter);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService) as jasmine.SpyObj<CurrencyService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get currency data on init', () => {
    const mockCurrencyData: Currency[] = [
      { symbol: 'AED', name: 'United Arab Emirates Dirham' },
      { symbol: 'AFN', name: 'Afghan Afghani' },
      { symbol: 'ALL', name: 'Albanian Lek' }
    ];

    currencyService.getCurrency.and.returnValue(of(mockCurrencyData));
    component.ngOnInit();
    expect(currencyService.getCurrency).toHaveBeenCalled();
    expect(component.currencyData.length).toBe(3);
    expect(component.currencyData[0].symbol).toBe('AED');
  });

  it('should convert currency from service', () => {
    const mockConversionResponse = {
      success: true,
      query: {
          from: 'GBP',
          to: 'JPY',
          amount: 25
      },
      info: {
          timestamp: 1720068124,
          rate: 205.82337
      },
      date: '2024-07-04',
      result: 5145.58425
    };

    currencyService.convertCurrency.and.returnValue(of(mockConversionResponse));

    component.source = 'GBP';
    component.destination = 'JPY';
    component.amount = 25;
    component.convert();

    expect(currencyService.convertCurrency).toHaveBeenCalledWith('GBP', 'JPY', 25);
    expect(component.convertedAmount).toBe(5145.58425);
    expect(component.conversionRate).toBe(205.82337);
  });

});
