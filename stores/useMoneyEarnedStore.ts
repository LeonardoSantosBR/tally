import { MoneyEarnedStore } from '@/types'
import { create } from 'zustand'

const toTwoDecimals = (value: number) => Math.round(value * 100) / 100
export const useMoneyEarnedStore = create<MoneyEarnedStore>((set) => ({
    moneyEarned: 0,
    setMoneyEarned: (value) => set({ moneyEarned: toTwoDecimals(value) }),
    addMoney: (value) =>
        set((state) => ({
            moneyEarned: toTwoDecimals(state.moneyEarned + value),
        })),
    resetMoneyEarned: () => set({ moneyEarned: 0 }),
}))
