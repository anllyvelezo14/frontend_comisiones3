import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerPerfilComponent } from './pages/ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { UsuarioComponent } from './pages/usuario.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
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
    path: 'tabla-usuarios',
    component: UsuarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRouting {}
