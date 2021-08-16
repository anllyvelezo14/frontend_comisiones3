import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { CrearSolicitudComponent } from './modules/solicitudes/crear-solicitud/crear-solicitud.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'app-login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'app-crear-solicitud', component: CrearSolicitudComponent },
  { path: '**', redirectTo: 'app-login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
