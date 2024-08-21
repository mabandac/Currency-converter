import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyConverter } from './currency-converter.component';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from './currency.service';
import { Currency } from './models/currency.models';
import { of } from 'rxjs';

describe('CurrencyConverter', () => {
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
    }).compileComponents();


    fixture = TestBed.createComponent(CurrencyConverter);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService) as jasmine.SpyObj<CurrencyService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get currency data on init', () => {
    const mockCurrencyData: Currency[] = [
      { symbol: 'ZAR', name: 'South African Rand' },
      { symbol: 'ZMW', name: 'Zambian Kwacha' },
      { symbol: 'ZWL', name: 'Zimbabwean Dollar' }
    ];

    currencyService.getCurrency.and.returnValue(of(mockCurrencyData));
    component.ngOnInit();
    expect(currencyService.getCurrency).toHaveBeenCalled();
    expect(component.currencyData.length).toBe(3);
    expect(component.currencyData[2].symbol).toBe('ZWL');
    expect(component.currencyData[2].name).toBe('Zimbabwean Dollar');
  });

  it('should convert currency from component', () => {
    const mockConversionResponse = {
      result: 'success',
      conversion_rate: 0.76776570,
      conversion_result: 1919.41,
      base_code: 'USD',
      target_code: 'GBP'

    };

    currencyService.convertCurrency.and.returnValue(of(mockConversionResponse));

    component.source = 'USD';
    component.destination = 'GBP';
    component.amount = 2500;
    component.convert();

    expect(currencyService.convertCurrency).toHaveBeenCalledWith('USD', 'GBP', 2500);
    expect(component.convertedAmount).toBe(1919.41);
    expect(component.conversionRate).toBe(0.76776570);
  });


});
