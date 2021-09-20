import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudesComponent } from './pages/solicitudes.component';
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';
import { VerSolicitudComponent } from './pages/ver-solicitud/ver-solicitud.component';
import { TablaSolicitudesComponent } from './pages/tabla-solicitudes/tabla-solicitudes.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'solicitudes',
    component: SolicitudesComponent,
    children: [
      {
        path: 'ver-solicitud/:id',
        component: VerSolicitudComponent,
      },
      {
        path: 'tabla-solicitudes',
        component: TablaSolicitudesComponent,
      },
    ],
  },
  {
    path: 'crear-solicitud',
    component: CrearSolicitudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
