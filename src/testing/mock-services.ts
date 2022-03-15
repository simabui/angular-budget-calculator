import { BudgetNote } from '../app/notes';

export class MockBudgetService {
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

export class MockModalService {
  isOpen = false;
  modalItem: BudgetNote = {
    amount: 0,
    id: 0,
    desc: '',
    type: 'expense',
  };

  open(item: BudgetNote): void {
    this.modalItem = item;
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  update(value: BudgetNote): void {}
}
