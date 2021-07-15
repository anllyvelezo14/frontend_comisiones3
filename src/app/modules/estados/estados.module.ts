import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AsociarEstadoComponent } from './pages/asociar-estado/asociar-estado.component';
import { SolicitudesModule } from '../solicitudes/solicitudes.module';

@NgModule({
  declarations: [AsociarEstadoComponent],
  imports: [CommonModule, SharedModule, NgbModule, SolicitudesModule],
  exports: [AsociarEstadoComponent],
})
export class EstadosModule {}
