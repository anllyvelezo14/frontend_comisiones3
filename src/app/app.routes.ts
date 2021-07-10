import { Routes, RouterModule } from '@angular/router';
import { CrearSolicitudComponent } from './modules/solicitudes/pages/crear-solicitud/crear-solicitud.component';
import { DatepickerComponent } from './shared/components/datepicker/datepicker.component';

const APP_ROUTES: Routes = [
  { path: 'app-crear-solicitud', component: CrearSolicitudComponent },
  { path: 'app-datepicker', component: DatepickerComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'app-crear-solicitud' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {
  relativeLinkResolution: 'legacy',
});
