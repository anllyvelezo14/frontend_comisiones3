import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerPerfilComponent } from './pages/ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { UsuarioComponent } from './pages/usuario.component';
import { RegistrarUsuariosComponent } from './pages/registrar-usuarios/registrar-usuarios.component';
import { ModificarContrasenaComponent } from './pages/editar-perfil/modificar-contrasena.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'tabla-usuarios',
    component: UsuarioComponent,
  },
  {
    path: 'ver-perfil/:id',
    component: VerPerfilComponent,
  },
  {
    path: 'editar-perfil/:id',
    component: EditarPerfilComponent,
  },
  {
    path: 'registrar-usuarios',
    component: RegistrarUsuariosComponent,
  },
  {
    path: 'modificar-contrasena/:id',
    component: ModificarContrasenaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRouting {}
