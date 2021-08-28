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

@NgModule({
  declarations: [VerPerfilComponent, EditarPerfilComponent, UsuarioComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    UsuariosRouting,
  ],
})
export class UsuariosModule {}
