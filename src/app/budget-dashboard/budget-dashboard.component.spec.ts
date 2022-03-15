import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetDashboardComponent } from './budget-dashboard.component';
import { BudgetService } from '../budget.service';
import { MockBudgetService } from '../../testing/mock-services';
import { BudgetNote } from '../notes';

const defaultBudgetItem: BudgetNote = {
  id: 0,
  amount: 10,
  desc: 'test desc',
  type: 'income',
};

describe('BudgetDashboardComponent', () => {
  let component: BudgetDashboardComponent;
  let fixture: ComponentFixture<BudgetDashboardComponent>;
  let budgetService: BudgetService;
  let componentElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [BudgetDashboardComponent],
      providers: [
        BudgetDashboardComponent,
        {
          provide: budgetService,
          useClass: MockBudgetService,
        },
      ],
    }).compileComponents();

    budgetService = TestBed.inject(BudgetService);
    fixture = TestBed.createComponent(BudgetDashboardComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component', () => {
    budgetService.addToBudget(defaultBudgetItem);
    fixture.detectChanges();
    const appBudgetItem = fixture.debugElement.query(By.css('app-budget-item'));

    expect(appBudgetItem).toBeTruthy();
  });
});
