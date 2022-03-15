import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { InputIncomeComponent } from './input-income/input-income.component';
import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';
import { BudgetItemComponent } from './budget-item/budget-item.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    InputIncomeComponent,
    BudgetDashboardComponent,
    BudgetItemComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
