import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {
  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {}

  get getTotalBudget() {
    return this.budgetService.getTotalBudget();
  }

  get budgetHighlight() {
    return this.budgetService.getTotalBudget() >= 0
      ? 'color: #03d788'
      : 'color: #f70000';
  }
}
