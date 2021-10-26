import { Component, OnInit, NgZone } from '@angular/core';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../core/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  usuario: Usuario;
  getId: any;
  updateUsuario: FormGroup;
  loading = false;
  submitted = false;
  error = '';

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
        this.updateUsuario.setValue({
          tipo_identificacion: res.tipo_identificacion,
          identificacion: res.identificacion,
          nombre: res.nombre,
          apellido: res.apellido,
          email: res.email,
          estado: res.estado,
          contrasena: res.contrasena,
          dia_disponible: res.dia_disponible,
        });
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg; // mensaje desde el back
          this.loading = false;
        }
      },
    });

    this.updateUsuario = this.formBuilder.group({
      tipo_identificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      estado: ['', Validators.required],
      contrasena: ['', Validators.required],
      dia_disponible: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.updateUsuario.controls;
  }

  onUpdate(): any {
    this.submitted = true;

    // stop here if form is invalid

    if (this.updateUsuario.invalid) {
      return;
    }

    this.usuarioService
      .updateUsuario(this.getId, this.updateUsuario.value)
      .subscribe({
        next: (res) => {
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/usuarios/ver-perfil/${this.getId}`)
          );
          Swal.fire({
            title: 'Actulizado',
            text: '¡El usuario se actualizó con éxito!',
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
