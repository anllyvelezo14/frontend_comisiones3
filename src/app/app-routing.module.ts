import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { CrearSolicitudComponent } from './modules/solicitudes/pages/crear-solicitud/crear-solicitud.component';

const routes: Routes = [
  { path: 'app-login', component: LoginComponent },
  { path: 'app-crear-solicitud', component: CrearSolicitudComponent },
  { path: '**', redirectTo: 'app-login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
