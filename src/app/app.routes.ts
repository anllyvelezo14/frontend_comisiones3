import { Routes, RouterModule } from '@angular/router';
import { CrearSolicitudComponent } from './modules/solicitudes/pages/crear-solicitud/crear-solicitud.component';
import { DatepickerComponent } from './shared/components/datepicker/datepicker.component';
import { VerSolicitudComponent } from './modules/solicitudes/pages/ver-solicitud/ver-solicitud.component';

const APP_ROUTES: Routes = [
  { path: 'app-crear-solicitud', component: CrearSolicitudComponent },
  { path: 'app-ver-solicitud', component: VerSolicitudComponent },
  { path: 'app-datepicker', component: DatepickerComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'app-ver-solicitud' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {
  relativeLinkResolution: 'legacy',
});
