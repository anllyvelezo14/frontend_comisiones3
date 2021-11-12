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
  styleUrls: ['./ver-estados-comision.component.css'],
})
export class ModalHistorialEstados {
  intermediateComisiones: Solicitud;

  constructor(
    public activeModal: NgbActiveModal,
    private activateRoute: ActivatedRoute,
    private solicitudService: SolicitudService
  ) {
    this.activateRoute.params.subscribe((params) => {
      const id = params.id;
      this.solicitudService.getSolicitud(id).subscribe((resSolicitud) => {
        this.intermediateComisiones = resSolicitud.intermediate_comisiones;
        console.log('intermediate_comisiones', this.intermediateComisiones);
      });
    });
  }
}

/////------- MODAL --------

@Component({
  selector: 'app-ver-estados-comision',
  templateUrl: './ver-estados-comision.component.html',

  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class VerEstadosComisionComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    this.modalService.open(ModalHistorialEstados, { size: 'lg' });
  }
}
