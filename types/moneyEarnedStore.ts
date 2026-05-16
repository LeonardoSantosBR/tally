export type MoneyEarnedStore = {
    moneyEarned: number
    setMoneyEarned: (value: number) => void
    addMoney: (value: number) => void
    resetMoneyEarned: () => void
}
