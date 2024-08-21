export interface Currency {
  symbol: string;
  name: string;
}

export interface CurrencySymbolsResponse {
  result: string;
  supported_codes: { [key: string]: string };
}

export interface ConversionResponse {
  result: string;
  conversion_rate: number;
  conversion_result: number;
  base_code: string;
  target_code: string;
}