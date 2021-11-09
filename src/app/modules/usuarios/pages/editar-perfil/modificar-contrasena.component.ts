import { Component, OnInit, NgZone } from '@angular/core';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../core/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.component.html',
  styleUrls: ['./modificar-contrasena.component.css'],
})
export class ModificarContrasenaComponent implements OnInit {
  usuario: Usuario;
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

    this.usuarioService.getUsuario(this.getId).subscribe({
      next: (res) => {
        this.updateContrasena.setValue({
          contrasena: '',
        });
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg; // mensaje desde el back
          this.loading = false;
        }
      },
    });

    this.updateContrasena = this.formBuilder.group({
      contrasena: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.updateContrasena.controls;
  }

  onUpdatePassword() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.updateContrasena.invalid) {
      return;
    }

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
