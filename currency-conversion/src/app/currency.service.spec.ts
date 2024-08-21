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
      { symbol: 'AED', name: 'UAE Dirham' },
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

      result: 'success',
      conversion_rate: 447.83,
      conversion_result: 17.91,
      base_code: 'GBP',
      target_code: 'ZWL'

    };

    currencyService.convertCurrency.and.returnValue(of(mockConversionResponse));

    component.source = 'GBP';
    component.destination = 'ZWL';
    component.amount = 25;
    component.convert();

    expect(currencyService.convertCurrency).toHaveBeenCalledWith('GBP', 'ZWL', 25);
    expect(component.convertedAmount).toBe(17.91);
    expect(component.conversionRate).toBe(447.83);
  });

});
