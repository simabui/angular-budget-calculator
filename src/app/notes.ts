export interface BudgetNote {
  amount: number;
  id: number;
  desc: string;
  type: 'expense' | 'income';
}
