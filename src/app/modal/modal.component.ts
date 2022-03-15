import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalForm.setValue({
      desc: this.modalService.modalItem.desc,
    });
  }

  modalForm = new FormGroup({
    desc: new FormControl(''),
  });

  closeModal(event: MouseEvent): void {
    event.stopPropagation();
    const className = (event.target as Element).className;

    if (event.target === event.currentTarget) {
      this.modalService.close();
    }
    if (className.includes('fa-times')) {
      this.modalService.close();
    }
  }

  onSubmit(): void {
    const updateObject = {
      ...this.modalService.modalItem,
      desc: this.modalForm.value.desc,
    };
    this.modalService.update(updateObject);
    this.modalForm.setValue({ desc: '' });
    this.modalService.close();
  }
}
