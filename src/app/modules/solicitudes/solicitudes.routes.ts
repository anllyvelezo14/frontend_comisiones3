import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';
import { VerSolicitudComponent } from './pages/ver-solicitud/ver-solicitud.component';
import { TablaSolicitudesComponent } from './pages/tabla-solicitudes.component';
import { EditarSolicitudComponent } from './pages/editar-solicitud/editar-solicitud.component';

export const routes: Routes = [
  {
    path: 'solicitudes',
    component: TablaSolicitudesComponent,
  },
  {
    path: 'ver-solicitud/:id',
    component: VerSolicitudComponent,
    children: [
      {
        path: 'estados',
        loadChildren: () =>
          import('../estados/estados.module').then((m) => m.EstadosModule),
      },
      {
        path: 'subir-cumplido',
        loadChildren: () =>
          import('../cumplidos/cumplidos.module').then(
            (m) => m.CumplidosModule
          ),
      },
    ],
  },
  {
    path: 'crear-solicitud',
    component: CrearSolicitudComponent,
  },
  {
    path: 'editar-solicitud/:id',
    component: EditarSolicitudComponent,
  },
  { path: '**', redirectTo: 'solicitudes', pathMatch: 'full' },

  //{
  // path: '',
  // children: [
  // {
  //   path: 'ver-solicitud/:id',
  //   component: VerSolicitudComponent,
  //   children: [
  //     {
  //       path: 'estado',
  //       loadChildren: () =>
  //         import('../estados/estados.module').then((m) => m.EstadosModule),
  //     },
  //   ],
  // },
  // {
  //   path: 'crear-solicitud',
  //   component: CrearSolicitudComponent,
  // },
  // {
  //   path: 'editar-solicitud/:id',
  //   component: EditarSolicitudComponent,
  // },
  // { path: '', redirectTo: 'solicitudes', pathMatch: 'full' },
  // ],
  //},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
