import { Component, OnInit, NgZone } from '@angular/core';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../core/models/usuario';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.component.html',
  styleUrls: ['./modificar-contrasena.component.css'],
})
export class ModificarContrasenaComponent implements OnInit {
  usuario: Usuario;
  usuario$: Observable<Usuario>;
  getId: any;
  updateContrasena: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  active = 1;

  constructor(
    private usuarioService: UsuarioService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.getId = this.activateRoute.snapshot.paramMap.get('id');

    // this.usuarioService
    //   .getUsuario(this.getId)
    //   .subscribe((resUsuario) => (this.usuario = resUsuario));

    // this.usuarioService.getUsuario(this.getId).subscribe({
    //   next: (resUsuario) => {
    //     this.usuario = resUsuario;
    //     console.log(this.usuario.contrasena);
    //     // this.updateContrasena.setValue({
    //     //   contrasena: '',
    //     //   confirmContrasena: '',
    //     //   contrasenaActual: '',
    //     // });
    //   },
    //   error: (err) => {
    //     if (err.status === 404 || err.status === 401) {
    //       this.error = err.error.msg; // mensaje desde el back
    //       this.loading = false;
    //     }
    //   },
    // });

    this.updateContrasena = this.formBuilder.group(
      {
        contrasena: ['', Validators.required],
        confirmContrasena: ['', Validators.required],
        //contrasenaActual: ['', Validators.required],
      },
      {
        validators: [
          //this.MustMatch('contrasena', 'contrasenaActual'),
          this.MustMatch('contrasena', 'confirmContrasena'),
        ],
      }
    );
  }

  ngOnInit(): void {}

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get f() {
    return this.updateContrasena.controls;
  }

  onUpdatePassword() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.updateContrasena.invalid) {
      return;
    }

    console.log(this.updateContrasena.value);

    this.usuarioService
      .updateUsuario(this.getId, this.updateContrasena.value)
      .subscribe({
        next: (res) => {
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/usuarios/ver-perfil/${this.getId}`)
          );
          Swal.fire({
            title: 'Actulizada',
            text: '¡La contraseña se actualizó con éxito!',
            icon: 'success',
            confirmButtonColor: '#3AB795',
          });
        },
        error: (err) => {
          if (err.status === 404 || err.status === 401) {
            this.error = err.error.msg;
            this.loading = false;
          }
        },
      });
  }
}
