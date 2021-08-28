import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerPerfilComponent } from './pages/ver-perfil/ver-perfil.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'ver-perfil',
    component: VerPerfilComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRouting {}
