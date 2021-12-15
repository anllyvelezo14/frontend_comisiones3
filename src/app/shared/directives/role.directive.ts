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

  @Input() appRole: string;
  //private currentUser: Rol;
  private permissions = [];
  isVisible = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    console.log(
      'this.usuarioService.currentUser()',
      this.usuarioService.currentUser());

      if (this.usuarioService.currentUser()) {
        this.viewContainerRef.clear();
      }
      // If the user has the role needed to 
      // render this component we can add it
      if (this.usuarioService.currentUser().includes(this.appRole)) {
        // If it is already visible (which can happen if
        // his roles changed) we do not need to add it a second time
        if (!this.isVisible) {
          // We update the `isVisible` property and add the 
          // templateRef to the view using the 
          // 'createEmbeddedView' method of the viewContainerRef
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        // If the user does not have the role, 
        // we update the `isVisible` property and clear
        // the contents of the viewContainerRef
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
  }

  // @Input()
  // set appRole(val: Array<string>) {
  //   console.log(val);
  //   //this.viewContainerRef.createEmbeddedView(this.templateRef);
  //   this.permissions = val;
  //   this.updateView();
  // }

  // private updateView(): void {
  //   this.viewContainerRef.clear();
  // }
}
