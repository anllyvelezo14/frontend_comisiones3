import { Routes, RouterModule } from '@angular/router';
import { CrearSolicitudComponent } from './modules/solicitudes/pages/crear-solicitud/crear-solicitud.component';
import { DatepickerComponent } from './shared/components/datepicker/datepicker.component';
import { VerSolicitudComponent } from './modules/solicitudes/pages/ver-solicitud/ver-solicitud.component';
import { VerEstadosComisionComponent } from './modules/solicitudes/modals/ver-estados-comision/ver-estados-comision.component';

const APP_ROUTES: Routes = [
  { path: 'app-crear-solicitud', component: CrearSolicitudComponent },
  { path: 'app-ver-solicitud', component: VerSolicitudComponent },
  { path: 'app-datepicker', component: DatepickerComponent },
  { path: 'app-ver-estados-comision', component: VerEstadosComisionComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'app-ver-solicitud' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {
  relativeLinkResolution: 'legacy',
});
