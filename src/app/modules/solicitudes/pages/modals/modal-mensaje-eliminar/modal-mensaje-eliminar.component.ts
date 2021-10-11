import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-mensaje-eliminar',
  templateUrl: './modal-mensaje-eliminar.component.html',
  styleUrls: ['./modal-mensaje-eliminar.component.css'],
})
export class ModalMensajeEliminarComponent implements OnInit {
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
