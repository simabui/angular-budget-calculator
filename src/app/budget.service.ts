import { Injectable } from '@angular/core';
import { BudgetNote } from './notes';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor() {}

  totalBudget: number = 0;
  budgetList: BudgetNote[] = [];

  getTotalBudget(): number {
    return this.totalBudget;
  }

  getBudgetList(): BudgetNote[] {
    return this.budgetList;
  }

  addToBudget(value: BudgetNote): void {
    this.totalBudget += value.amount;

    this.budgetList.push(value);
  }

  updateBudget(value: BudgetNote): void {
    const budgetItem = this.budgetList.find((item) => item.id === value.id);
    budgetItem!.desc = value.desc;
  }

  removeFromBudget(value: BudgetNote): void {
    this.budgetList = this.budgetList.filter((item) => item.id !== value.id);

    this.totalBudget = this.budgetList.reduce(
      (acc, item) => acc + item.amount,
      0
    );
  }
}
