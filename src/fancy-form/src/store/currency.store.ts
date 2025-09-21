import { create } from 'zustand'

interface Currency {
  currency: string
  date: string
  price: number
}

interface CurrencyStore {
  currencyList: Currency[];
  setCurrencyList: (currencyList: Currency[]) => void;
}

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currencyList: [],
  setCurrencyList: (currencyList: Currency[]) => set({ currencyList }),
}))