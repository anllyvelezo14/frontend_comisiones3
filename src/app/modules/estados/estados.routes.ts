import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsociarEstadoComponent } from './asociar-estado/asociar-estado.component';

export const routes: Routes = [
  {
    path: '',
    component: AsociarEstadoComponent,
    // children: [
    //   // {
    //   //   path: 'asociar-estado',
    //   //   component: AsociarEstadoComponent,
    //   // },
    // ],
  },
  //{ path: '**', redirectTo: '/home/solicitudes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadosRoutingModule {}
