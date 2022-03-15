import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ModalService } from '../modal.service';
import { MockModalService } from '../../testing/mock-services';
import { BudgetNote } from '../notes';
import { By } from '@angular/platform-browser';

const defaultBudgetItem: BudgetNote = {
  id: 0,
  amount: 10,
  desc: 'test desc',
  type: 'income',
};

const eventObj = {
  stopPropagation: () => {},
  target: true,
  currentTarget: true,
};
describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: ModalService;
  let componentElement: HTMLElement;
  let onSubmit: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        ModalComponent,
        {
          provide: ModalService,
          useClass: MockModalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    modalService = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;

    onSubmit = spyOn(component, 'onSubmit').and.callThrough();
  });

  afterEach(() => {
    modalService.modalItem = {
      amount: 0,
      id: 0,
      desc: '',
      type: 'expense',
    };
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component', () => {
    modalService.open(defaultBudgetItem);
    fixture.detectChanges();

    expect(component.modalForm.value.desc).toEqual(defaultBudgetItem.desc);
  });

  it('should submit form', () => {
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    fixture.detectChanges();

    expect(onSubmit.calls.any()).toBeTruthy();
    expect(component.modalForm.value.desc).toBeFalsy();
    expect(modalService.isOpen).toBeFalse();
  });

  it('should close form', () => {
    modalService.open(defaultBudgetItem);

    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('.modal__close'));

    buttonEl.triggerEventHandler('click', eventObj);

    fixture.detectChanges();
    expect(modalService.isOpen).toBeFalse();
  });
});
