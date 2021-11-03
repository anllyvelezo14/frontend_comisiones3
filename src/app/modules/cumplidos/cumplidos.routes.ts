import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubirCumplidoComponent } from './subir-cumplido/subir-cumplido.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'subir-cumplido',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SubirCumplidoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CumplidosRoutingModule {}
