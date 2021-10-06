import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../../../../core/services/solicitud.service';
import { Solicitud } from '../../../../core/models/solicitud';
import {
  NgbModalConfig,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';

interface Estado {
  fecha: string;
  observacion: String;
}

//// --- COMPONENTE TABLA DENTRO DEL MODAL ------

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-historial-estados.component.html',
})
export class ModalHistorialEstados {
  solicitud: Solicitud;

  constructor(
    public activeModal: NgbActiveModal,
    private activateRoute: ActivatedRoute,
    private solicitudService: SolicitudService
  ) {
    this.activateRoute.params.subscribe((params) => {
      const id = params.id;
      this.solicitudService
        .getSolicitud(id)
        .subscribe((resSolicitud) => (this.solicitud = resSolicitud));
    });
  }
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
