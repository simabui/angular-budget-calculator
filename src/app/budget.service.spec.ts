import { TestBed } from '@angular/core/testing';
import { BudgetService } from './budget.service';
import { BudgetNote } from './notes';

const defaultBudget: BudgetNote = {
  id: 0,
  amount: 10,
  desc: 'test desc',
  type: 'income',
};

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  afterEach(() => {
    service.totalBudget = 0;
    service.budgetList = [];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get totalBudget', () => {
    expect(service.getTotalBudget).toBeTruthy();
    expect(service.getTotalBudget()).toEqual(0);
  });

  it('should get budgetList', () => {
    expect(service.getBudgetList).toBeTruthy();
    const budgetList = service.getBudgetList();

    expect(budgetList.length).toEqual(0);
  });

  it('should add to budget', () => {
    expect(service.addToBudget).toBeTruthy();
    service.addToBudget(defaultBudget);

    expect(service.budgetList.length).toEqual(1);
    expect(service.totalBudget).toEqual(10);
  });

  it('should update to budget', () => {
    expect(service.updateBudget).toBeTruthy();
    const toUpdateBudget = {
      ...defaultBudget,
      desc: 'new desc',
    };

    service.addToBudget(defaultBudget);
    service.updateBudget(toUpdateBudget);

    expect(service.budgetList.length).toEqual(1);
    expect(service.budgetList[0].desc).toEqual('new desc');
    expect(service.totalBudget).toEqual(10);
  });

  it('should update to budget', () => {
    expect(service.updateBudget).toBeTruthy();
    const toUpdateBudget = {
      ...defaultBudget,
      desc: 'new desc',
    };

    service.addToBudget(defaultBudget);
    service.updateBudget(toUpdateBudget);

    expect(service.budgetList.length).toEqual(1);
    expect(service.budgetList[0].desc).toEqual('new desc');
    expect(service.totalBudget).toEqual(10);
  });

  it('should remove from budget', () => {
    expect(service.removeFromBudget).toBeTruthy();
    service.addToBudget(defaultBudget);
    service.removeFromBudget(defaultBudget);

    expect(service.budgetList.length).toEqual(0);
    expect(service.totalBudget).toEqual(0);
  });
});
