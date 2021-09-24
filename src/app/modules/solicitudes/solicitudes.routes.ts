import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';
import { VerSolicitudComponent } from './pages/ver-solicitud/ver-solicitud.component';
import { TablaSolicitudesComponent } from './pages/tabla-solicitudes.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'solicitudes',
        component: TablaSolicitudesComponent,
      },
      {
        path: 'ver-solicitud/:id',
        component: VerSolicitudComponent,
      },
      {
        path: 'crear-solicitud',
        component: CrearSolicitudComponent,
      },
      { path: '**', redirectTo: 'solicitudes' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
