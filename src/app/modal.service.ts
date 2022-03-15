import { Injectable } from '@angular/core';
import { BudgetNote } from './notes';
import { BudgetService } from './budget.service';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private budgetService: BudgetService) {}

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

  update(value: BudgetNote): void {
    this.budgetService.updateBudget(value);
  }
}
