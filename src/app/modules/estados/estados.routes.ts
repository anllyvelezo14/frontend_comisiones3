import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsociarEstadoComponent } from './asociar-estado/asociar-estado.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'estados',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AsociarEstadoComponent,
  },
  //{ path: '**', redirectTo: '/home/solicitudes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadosRoutingModule {}
