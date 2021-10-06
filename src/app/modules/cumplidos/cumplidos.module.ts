import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { SubirCumplidoComponent } from './subir-cumplido/subir-cumplido.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'subir-cumplido', component: SubirCumplidoComponent },
  { path: '**', redirectTo: 'subir-cumplido' },
];

@NgModule({
  declarations: [SubirCumplidoComponent],
  imports: [CommonModule, SharedModule, NgbModule, ReactiveFormsModule],
  exports: [SubirCumplidoComponent],
})
export class CumplidosModule {}
