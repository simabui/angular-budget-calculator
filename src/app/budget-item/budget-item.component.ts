import { Component, Input, OnInit } from '@angular/core';
import { BudgetNote } from '../notes';
import { BudgetService } from '../budget.service';
import { ModalService } from '../modal.service';
@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html',
  styleUrls: ['./budget-item.component.scss'],
})
export class BudgetItemComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {}
  @Input() item!: BudgetNote;

  onEditItem(): void {
    this.modalService.open(this.item);
  }

  removeItem(): void {
    this.budgetService.removeFromBudget(this.item);
  }
}
