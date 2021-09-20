import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  VerEstadosComisionComponent,
  ModalHistorialEstados,
} from './pages/modals/ver-estados-comision/ver-estados-comision.component';
import { VerSolicitudComponent } from './pages/ver-solicitud/ver-solicitud.component';
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';
import { TablaSolicitudesComponent } from './pages/tabla-solicitudes/tabla-solicitudes.component';
import { SolicitudesComponent } from './pages/solicitudes.component';
import { HomeRoutingModule } from './solicitudes.routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SolicitudService } from '../../core/services/solicitud.service';

@NgModule({
  declarations: [
    VerEstadosComisionComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent,
    ModalHistorialEstados,
    TablaSolicitudesComponent,
    SolicitudesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    VerEstadosComisionComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent,
    TablaSolicitudesComponent,
    SolicitudesComponent,
  ],
  providers: [SolicitudService],
  bootstrap: [],
})
export class SolicitudesModule {}
