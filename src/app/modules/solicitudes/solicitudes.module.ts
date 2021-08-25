import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  VerEstadosComisionComponent,
  ModalHistorialEstados,
} from './modals/ver-estados-comision/ver-estados-comision.component';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { TablaSolicitudesComponent } from './tabla-solicitudes/tabla-solicitudes.component';

@NgModule({
  declarations: [
    VerEstadosComisionComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent,
    ModalHistorialEstados,
    TablaSolicitudesComponent,
  ],
  imports: [CommonModule, SharedModule, NgbModule],
  exports: [
    VerEstadosComisionComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent,
  ],
  bootstrap: [],
})
export class SolicitudesModule {}
