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
// import { TokenInterceptor } from './core/interceptors/token.interceptor';

// ROUTES
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavegationComponent } from './layouts/navegation/navegation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData, CommonModule } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
import { EstadosModule } from './modules/estados/estados.module';
import { CumplidosModule } from './modules/cumplidos/cumplidos.module';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthModule } from './core/auth/auth.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

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
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    SharedModule,
    SolicitudesModule,
    EstadosModule,
    CumplidosModule,
    UsuariosModule,
    AuthModule,
    SidebarModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' },
  ], // en español
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
