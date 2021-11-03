import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AsociarEstadoComponent } from './asociar-estado/asociar-estado.component';
import { EstadosRoutingModule } from './estados.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AsociarEstadoComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    EstadosRoutingModule,
  ],
  exports: [AsociarEstadoComponent],
})
export class EstadosModule {}
