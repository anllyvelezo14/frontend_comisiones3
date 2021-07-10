import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { APP_ROUTING } from './app.routes';

// MODULES
import { SharedModule } from './shared/shared.module';
import { SolicitudesModule } from './modules/solicitudes/solicitudes.module';

// ROUTES
import { VerPerfilComponent } from './modules/usuarios/pages/ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from './modules/usuarios/pages/editar-perfil/editar-perfil.component';
import { VerSolicitudComponent } from './modules/solicitudes/pages/ver-solicitud/ver-solicitud.component';
import { CrearSolicitudComponent } from './modules/solicitudes/pages/crear-solicitud/crear-solicitud.component';
import { AsociarEstadoComponent } from './modules/estados/pages/asociar-estado/asociar-estado.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
registerLocaleData(localeCl, 'es');

@NgModule({
  declarations: [
    AppComponent,
    VerPerfilComponent,
    EditarPerfilComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent,
    AsociarEstadoComponent,
    LoginComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SolicitudesModule,
    APP_ROUTING,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }], // en español
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
