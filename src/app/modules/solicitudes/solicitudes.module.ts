import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerEstadosComisionComponent } from './modals/ver-estados-comision/ver-estados-comision.component';
import { VerSolicitudComponent } from './pages/ver-solicitud/ver-solicitud.component';
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';
import { SubirCumplidoComponent } from '../cumplidos/subir-cumplido/subir-cumplido.component';

@NgModule({
  declarations: [
    VerEstadosComisionComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent,
    SubirCumplidoComponent,
  ],
  imports: [CommonModule, SharedModule, NgbModule],
  exports: [
    VerEstadosComisionComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent,
    SubirCumplidoComponent,
  ],
  bootstrap: [],
})
export class SolicitudesModule {}
