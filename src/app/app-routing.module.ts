import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/solicitudes/solicitudes.module').then(
            (m) => m.SolicitudesModule
          ),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./modules/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
      },
      // {
      //   path: 'estados',
      //   loadChildren: () =>
      //     import('./modules/estados/estados.module').then(
      //       (m) => m.EstadosModule
      //     ),
      // },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
