import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  VerEstadosComisionComponent,
  ModalHistorialEstados,
} from './pages/modals/ver-estados-comision.component';
import { VerSolicitudComponent } from './pages/ver-solicitud/ver-solicitud.component';
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SolicitudService } from '../../core/services/solicitud.service';
import { HomeRoutingModule } from './solicitudes.routes';
import { TablaSolicitudesComponent } from './pages/tabla-solicitudes.component';
import { TipoSolicitudService } from '../../core/services/tipo-solicitud.service';
import { EditarSolicitudComponent } from './pages/editar-solicitud/editar-solicitud.component';
import { CumplidosModule } from '../cumplidos/cumplidos.module';
import { EstadosModule } from '../estados/estados.module';

@NgModule({
  declarations: [
    VerEstadosComisionComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent,
    ModalHistorialEstados,
    TablaSolicitudesComponent,
    EditarSolicitudComponent,
  ],
  imports: [
    HomeRoutingModule,

    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,

    CumplidosModule,
    EstadosModule,
  ],
  exports: [
    VerEstadosComisionComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent,
    TablaSolicitudesComponent,
  ],
  providers: [SolicitudService, TipoSolicitudService],
  bootstrap: [],
})
export class SolicitudesModule {}
