import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerPerfilComponent } from './modules/usuarios/pages/ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from './modules/usuarios/pages/editar-perfil/editar-perfil.component';
import { VerSolicitudComponent } from './modules/solicitudes/pages/ver-solicitud/ver-solicitud.component';
import { CrearSolicitudComponent } from './modules/solicitudes/pages/crear-solicitud/crear-solicitud.component';
import { AsociarEstadoComponent } from './modules/estados/pages/asociar-estado/asociar-estado.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
