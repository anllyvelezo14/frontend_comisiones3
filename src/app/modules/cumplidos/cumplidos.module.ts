import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubirCumplidoComponent } from './subir-cumplido/subir-cumplido.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [SubirCumplidoComponent],
  imports: [
    CommonModule, SharedModule, NgbModule
  ],
  exports: [SubirCumplidoComponent]
})
export class CumplidosModule { }
