import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Rol } from 'src/app/core/models/rol';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Directive({
  selector: '[appRoleDirective]'
})
export class RoleDirectiveDirective implements OnInit {
  private currentUser: Rol;
  private permissions = []

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private usuarioService: UsuarioService,
  ) {

   }

   ngOnInit(): void {
     this.usuarioService.currentUser
   }

  

}
