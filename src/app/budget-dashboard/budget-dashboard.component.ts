import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { BudgetService } from '../budget.service';

const listAnimation = trigger('listAnimation', [
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateY(-30px)',
    }),
    animate(
      '200ms',
      style({
        opacity: 1,
        transform: 'translateY(0)',
        height: '*',
      })
    ),
  ]),
  transition('* => void', [
    animate('100ms', style({ opacity: 1, transform: 'scale(1.1)' })),
    animate(
      '100ms',
      style({
        opacity: 0,
        height: 0,
        transform: 'scale(0.6)',
      })
    ),
  ]),
]);

@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrls: ['./budget-dashboard.component.scss'],
  animations: [listAnimation],
})
export class BudgetDashboardComponent implements OnInit {
  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {}

  get getIncomeBudget() {
    return this.budgetService
      .getBudgetList()
      .filter((item) => item.type === 'income');
  }

  get getExpenseBudget() {
    return this.budgetService
      .getBudgetList()
      .filter((item) => item.type === 'expense');
  }
}
