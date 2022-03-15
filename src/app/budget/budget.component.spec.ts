import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetService } from '../budget.service';
import { BudgetComponent } from './budget.component';
import { MockBudgetService } from '../../testing/mock-services';
import { BudgetNote } from '../notes';

const defaultBudgetItem: BudgetNote = {
  id: 0,
  amount: 10,
  desc: 'test desc',
  type: 'income',
};

describe('BudgetComponent', () => {
  let budgetService: BudgetService;
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let componentElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetComponent],
      providers: [
        BudgetComponent,
        {
          provide: budgetService,
          useClass: MockBudgetService,
        },
      ],
    }).compileComponents();

    budgetService = TestBed.inject(BudgetService);
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display positive totalBudget number', () => {
    budgetService.addToBudget(defaultBudgetItem);
    fixture.detectChanges();

    const budgetBlock = componentElement.querySelector('.budget__total')!;
    const spanEl = budgetBlock?.firstElementChild!;
    const textStyle = getComputedStyle(spanEl);

    expect(budgetBlock?.firstElementChild?.innerHTML).toEqual('10');
    expect(textStyle.color).toEqual('rgb(3, 215, 136)');
  });

  it('should display negative totalBudget number', () => {
    const negativeDefaultBudgetItem = {
      ...defaultBudgetItem,
      amount: -10,
    };
    budgetService.addToBudget(negativeDefaultBudgetItem);
    fixture.detectChanges();

    const budgetBlock = componentElement.querySelector('.budget__total')!;
    const spanEl = budgetBlock?.firstElementChild!;

    const textStyle = getComputedStyle(spanEl);
    expect(budgetBlock?.firstElementChild?.innerHTML).toEqual('-10');
    expect(textStyle.color).toEqual('rgb(247, 0, 0)');
  });
});
