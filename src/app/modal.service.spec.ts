import { TestBed } from '@angular/core/testing';
import { BudgetNote } from './notes';
import { ModalService } from './modal.service';
import { BudgetService } from './budget.service';

const defaultBudget: BudgetNote = {
  id: 0,
  amount: 10,
  desc: 'test desc',
  type: 'income',
};

describe('ModalService', () => {
  let service: ModalService;
  let budgetService: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
    budgetService = TestBed.inject(BudgetService);
  });

  afterEach(() => {
    service.isOpen = false;
    service.modalItem = defaultBudget;
    budgetService.totalBudget = 0;
    budgetService.budgetList = [];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open modal', () => {
    expect(service.open).toBeTruthy();

    service.open(defaultBudget);
    expect(service.isOpen).toBeTrue();
    expect(service.modalItem).toEqual(defaultBudget);
  });

  it('should close modal', () => {
    expect(service.close).toBeTruthy();

    service.close();
    expect(service.isOpen).toBeFalse();
  });

  it('should call update', () => {
    budgetService.addToBudget(defaultBudget);

    expect(service.update).toBeTruthy();
    const updateBudget = {
      ...defaultBudget,
      desc: 'new desc',
    };

    service.update(updateBudget);
    expect(budgetService.totalBudget).toEqual(10);
    expect(budgetService.budgetList.length).toEqual(1);
    expect(budgetService.budgetList[0].desc).toEqual('new desc');
  });
});
