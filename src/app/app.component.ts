import { Component } from '@angular/core';
import { ModalService } from './modal.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-budget-calculator';
  constructor(private modalService: ModalService) {}

  get isVisible(): boolean {
    return this.modalService.isOpen;
  }
}
