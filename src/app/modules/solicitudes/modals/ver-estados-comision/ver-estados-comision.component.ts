import { Component, Input } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';

interface Estado {
  fecha: string;
  observacion: String;
}

const ESTADOS: Estado[] = [
  {
    fecha: '20 Ene 2021',
    observacion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    fecha: '20 Ene 2021',
    observacion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
];

//// --- COMPONENTE TABLA DENTRO DEL MODAL ------

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-historial-estados.component.html',
})
export class ModalHistorialEstados {
  estados = ESTADOS;

  constructor(public activeModal: NgbActiveModal) {}
}

/////------- MODAL --------

@Component({
  selector: 'app-ver-estados-comision',
  templateUrl: './ver-estados-comision.component.html',
  styleUrls: ['./ver-estados-comision.component.css'],

  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class VerEstadosComisionComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    this.modalService.open(ModalHistorialEstados, { size: 'lg' });
  }
}
