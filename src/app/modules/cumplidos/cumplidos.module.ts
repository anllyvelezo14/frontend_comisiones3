import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubirCumplidoComponent } from './subir-cumplido/subir-cumplido.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CumplidosRoutingModule } from './cumplidos.routes';

@NgModule({
  declarations: [SubirCumplidoComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    CumplidosRoutingModule,
  ],
  exports: [SubirCumplidoComponent],
})
export class CumplidosModule {}
