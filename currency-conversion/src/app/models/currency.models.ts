export interface Currency {
  symbol: string;
  name: string;
}

export interface CurrencySymbolsResponse {
  success: boolean;
  symbols: { [key: string]: string };
}

export interface ConversionResponse {
  success: boolean;
  result: number;
  info: {
    rate: number;
    timestamp: number;
  }
  date:string;
  query: {
    from: string;
    to: string;
    amount: number
  }
}