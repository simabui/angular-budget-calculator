import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BudgetService } from '../budget.service';
@Component({
  selector: 'app-input-income',
  templateUrl: './input-income.component.html',
  styleUrls: ['./input-income.component.scss'],
})
export class InputIncomeComponent implements OnInit {
  constructor(private budjetService: BudgetService) {}

  ngOnInit(): void {}

  budgetForm = new FormGroup({
    amount: new FormControl(0, Validators.required),
    desc: new FormControl(''),
  });

  isValid: boolean = true;

  onSubmit(): void {
    if (!this.budgetForm.valid) {
      this.isValid = false;
      return;
    }
    if (this.budgetForm.value.amount === 0) {
      return;
    }
    const input = {
      id: this.budjetService.budgetList.length + 1,
      ...this.budgetForm.value,
    };

    if (this.budgetForm.value.amount >= 0) {
      input.type = 'income';
    } else {
      input.type = 'expense';
    }

    this.budjetService.addToBudget(input);
    this.reset();
  }

  reset(): void {
    this.budgetForm.setValue({
      amount: 0,
      desc: '',
    });
  }
}
