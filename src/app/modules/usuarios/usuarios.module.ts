import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { UsuariosRouting } from './usuarios.routes';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { VerPerfilComponent } from './pages/ver-perfil/ver-perfil.component';
import { UsuarioComponent } from './pages/usuario.component';
import { RegistrarUsuariosComponent } from './pages/registrar-usuarios/registrar-usuarios.component';
import { UsuarioService } from '../../core/services/usuario.service';
import { RolService } from '../../core/services/rol.service';
import { DepartamentoService } from '../../core/services/departamento.service';
import { ModificarContrasenaComponent } from './pages/editar-perfil/modificar-contrasena.component';

@NgModule({
  declarations: [
    VerPerfilComponent,
    EditarPerfilComponent,
    UsuarioComponent,
    RegistrarUsuariosComponent,
    ModificarContrasenaComponent,
  ],
  imports: [
    UsuariosRouting,
    CommonModule,
    NgbModule,
    FormsModule,
    //HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    VerPerfilComponent,
    EditarPerfilComponent,
    UsuarioComponent,
    RegistrarUsuariosComponent,
  ],
  providers: [UsuarioService, RolService, DepartamentoService],
})
export class UsuariosModule {}
