import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Rol } from 'src/app/core/models/rol';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Directive({
  selector: '[appRole]',
})
export class RoleDirective implements OnInit {
  private currentUser: Rol;
  private permissions = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    console.log(
      'this.usuarioService.currentUser()',
      this.usuarioService.currentUser()
    );
  }

  @Input()
  set appRole(val: Array<string>) {
    console.log(val);
    //this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.permissions = val;
    this.updateView();
  }

  private updateView(): void {
    this.viewContainerRef.clear();
  }
}
