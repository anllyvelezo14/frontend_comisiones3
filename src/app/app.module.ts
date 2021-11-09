import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// MODULES
import { SharedModule } from './shared/shared.module';
import { SolicitudesModule } from './modules/solicitudes/solicitudes.module';
import { SidebarModule } from 'ng-sidebar';
import { EstadosModule } from './modules/estados/estados.module';
import { CumplidosModule } from './modules/cumplidos/cumplidos.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './core/auth/auth.module';
import { CoreModule } from './core/core.module';

// SERVICES
import { AuthService } from './core/services/auth.service';
import { TokenInterceptor } from './core/helpers/token.interceptor';
import { SolicitudService } from './core/services/solicitud.service';

// GUARDS
import { AuthGuard } from './core/guards/auth.guard';

// COMPONENTS
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavegationComponent } from './layouts/navegation/navegation.component';

import { registerLocaleData, CommonModule, DecimalPipe } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
import { RouterModule } from '@angular/router';

registerLocaleData(localeCl, 'es');

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    NavegationComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,

    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    SharedModule,
    SolicitudesModule,
    EstadosModule,
    CumplidosModule,
    UsuariosModule,
    AuthModule,
    // CoreModule,
    SidebarModule.forRoot(),
  ],
  providers: [
    DecimalPipe,

    AuthGuard,
    AuthService,
    // SolicitudService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' }, // en español
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
