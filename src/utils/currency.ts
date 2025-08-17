import { Currency } from '@/types';
import exchangeRatesData from '@/data/exchangeRates.json';

export function formatCurrency(amount: number, currency: Currency): string {
  const convertedAmount = convertCurrency(amount, 'DZD', currency);
  
  const formatters = {
    DZD: new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    EUR: new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    USD: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  };

  return formatters[currency].format(convertedAmount);
}

export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number {
  if (fromCurrency === toCurrency) return amount;

  const rates = exchangeRatesData as Record<Currency, number>;
  
  // Convert to DZD first (base currency)
  const amountInDZD = fromCurrency === 'DZD' ? amount : amount / rates[fromCurrency];
  
  // Convert from DZD to target currency
  return toCurrency === 'DZD' ? amountInDZD : amountInDZD * rates[toCurrency];
}

export function getCurrencySymbol(currency: Currency): string {
  const symbols = {
    DZD: 'د.ج',
    EUR: '€',
    USD: '$',
  };
  return symbols[currency];
}