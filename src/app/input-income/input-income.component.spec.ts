import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputIncomeComponent } from './input-income.component';
import { BudgetService } from '../budget.service';
import { MockBudgetService } from '../../testing/mock-services';

describe('InputIncomeComponent', () => {
  let component: InputIncomeComponent;
  let fixture: ComponentFixture<InputIncomeComponent>;
  let budgetService: BudgetService;
  let componentElement: HTMLElement;
  let onSubmit: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [InputIncomeComponent],
      providers: [
        InputIncomeComponent,
        {
          provide: budgetService,
          useClass: MockBudgetService,
        },
      ],
    }).compileComponents();

    budgetService = TestBed.inject(BudgetService);
    fixture = TestBed.createComponent(InputIncomeComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;

    onSubmit = spyOn(component, 'onSubmit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form', () => {
    const amountInput = componentElement.querySelector('.form__amount');
    const descInput = componentElement.querySelector('.form__description');
    const submitButton = componentElement.getElementsByTagName('button');

    expect(amountInput).toBeTruthy();
    expect(descInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should submit form', () => {
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    fixture.detectChanges();

    expect(onSubmit.calls.any()).toBeTruthy();
  });

  it('should create new budget item', () => {
    component.budgetForm.controls['amount'].setValue(10);
    component.budgetForm.controls['desc'].setValue('some desc');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.budgetForm.value.amount).toEqual(0);
    expect(component.budgetForm.value.desc).toEqual('');
    expect(component.isValid).toBeTruthy();
    expect(budgetService.budgetList[0]).toBeDefined();
    expect(budgetService.budgetList[0].amount).toEqual(10);
    expect(budgetService.budgetList[0].desc).toEqual('some desc');
  });
});
