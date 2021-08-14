import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// MODULES
import { SharedModule } from './shared/shared.module';
import { SolicitudesModule } from './modules/solicitudes/solicitudes.module';
import { SidebarModule } from 'ng-sidebar';

// SERVICES
import { AuthService } from './core/services/auth.service';
//import { TokenInterceptor } from './core/interceptors/token.interceptor';

// ROUTES
import { VerPerfilComponent } from './modules/usuarios/pages/ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from './modules/usuarios/pages/editar-perfil/editar-perfil.component';
import { LoginComponent } from './core/auth/login/login.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ComisionesComponent } from './modules/comisiones/comisiones.component';
import { NavegationComponent } from './layouts/navegation/navegation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData, CommonModule } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
import { EstadosModule } from './modules/estados/estados.module';
import { CumplidosModule } from './modules/cumplidos/cumplidos.module';

registerLocaleData(localeCl, 'es');

@NgModule({
  declarations: [
    AppComponent,
    VerPerfilComponent,
    EditarPerfilComponent,
    SidebarComponent,
    FooterComponent,
    ComisionesComponent,
    NavegationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SolicitudesModule,
    EstadosModule,
    CumplidosModule,
    HttpClientModule,
    SidebarModule.forRoot(),
  ],
  providers: [
    AuthService,
    //{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' },
  ], // en español
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
