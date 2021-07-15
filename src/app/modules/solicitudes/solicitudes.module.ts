import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  VerEstadosComisionComponent,
  ModalHistorialEstados,
} from './modals/ver-estados-comision/ver-estados-comision.component';
import { VerSolicitudComponent } from './pages/ver-solicitud/ver-solicitud.component';
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';

@NgModule({
  declarations: [
    VerEstadosComisionComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent,
    ModalHistorialEstados,
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
