import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetItemComponent } from './budget-item.component';
import { BudgetService } from '../budget.service';
import { ModalService } from '../modal.service';
import {
  MockBudgetService,
  MockModalService,
} from '../../testing/mock-services';
import { BudgetNote } from '../notes';

const defaultBudgetItem: BudgetNote = {
  id: 0,
  amount: 10,
  desc: 'test desc',
  type: 'income',
};

describe('BudgetItemComponent', () => {
  let component: BudgetItemComponent;
  let fixture: ComponentFixture<BudgetItemComponent>;
  let budgetService: BudgetService;
  let modalService: ModalService;
  let componentElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetItemComponent],
      providers: [
        BudgetItemComponent,
        {
          provide: budgetService,
          useClass: MockBudgetService,
        },
        {
          provide: modalService,
          useClass: MockModalService,
        },
      ],
    }).compileComponents();

    budgetService = TestBed.inject(BudgetService);
    modalService = TestBed.inject(ModalService);
    fixture = TestBed.createComponent(BudgetItemComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component', () => {
    component.item = defaultBudgetItem;

    fixture.detectChanges();
    const item = componentElement.querySelector('.item');

    expect(item?.children[0].innerHTML).toEqual(defaultBudgetItem.desc);
    expect(item?.children[1].innerHTML).toEqual(
      ` ${defaultBudgetItem.amount} `
    );

    expect(item?.children[2].innerHTML).toBeTruthy();
  });

  it('should open modal', () => {
    component.item = defaultBudgetItem;
    const onEditItem: jasmine.Spy = spyOn(
      component,
      'onEditItem'
    ).and.callThrough();
    const item = componentElement.querySelector('.item')!;

    item.dispatchEvent(new Event('click'));

    expect(onEditItem.calls.any()).toBeTrue();
    expect(modalService.isOpen).toBeTrue();
    expect(modalService.modalItem).toBeTruthy();
    expect(modalService.modalItem.amount).toEqual(defaultBudgetItem.amount);
    expect(modalService.modalItem.desc).toEqual(defaultBudgetItem.desc);
    expect(modalService.modalItem.type).toEqual(defaultBudgetItem.type);
  });

  it('should delete item', () => {
    component.item = defaultBudgetItem;
    const removeItem: jasmine.Spy = spyOn(
      component,
      'removeItem'
    ).and.callThrough();
    const itemDelete = componentElement.querySelector('.item__delete')!;

    itemDelete.dispatchEvent(new Event('click'));

    expect(removeItem.calls.any()).toBeTrue();
    expect(budgetService.totalBudget).toEqual(0);
    expect(budgetService.budgetList.length).toEqual(0);
  });
});
