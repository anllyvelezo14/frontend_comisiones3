import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Departamento } from '../../../../core/models/departamento';
import { Rol } from '../../../../core/models/rol';
import { DepartamentoService } from '../../../../core/services/departamento.service';
import { RolService } from '../../../../core/services/rol.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css'],
})
export class RegistrarUsuariosComponent implements OnInit {
  loading = false;
  submitted = false;
  error = '';
  isEmailValid = /^[a-zA-Z0-9._%+-]+@udea.edu.co$/;
  departamentos$: Observable<Departamento[]>;
  roles$: Observable<Rol[]>;

  tipoIdentificacion = [
    '',
    'Cédula de Ciudadanía',
    'Tarjeta de Identidad',
    'Cédula de Extrangería',
    'Pasaporte',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private departamentoService: DepartamentoService,
    private rolService: RolService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.departamentos$ = this.departamentoService.getDepartamentos();
    this.roles$ = this.rolService.getRoles();
  }

  registrarUsuariosForm = this.formBuilder.group({
    tipo_identificacion: ['', [Validators.required, Validators.nullValidator]],
    identificacion: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.isEmailValid)]],
    contrasena: ['', Validators.required],
    departamentos_id: ['', Validators.required],
    roles_id: ['', Validators.required],
  });

  ngOnInit(): void {}

  // convenience getters for easy access to form fields
  get f() {
    return this.registrarUsuariosForm.controls;
  }

  registrarUsuario(): any {
    this.submitted = true;

    // stop here if form is invalid

    if (this.registrarUsuariosForm.invalid) {
      return;
    }

    if (this.registrarUsuariosForm.valid) {
      return this.usuarioService
        .createUsuario(this.registrarUsuariosForm.value)
        .subscribe({
          next: (res) => {
            this.ngZone.run(() =>
              this.router.navigate(['/usuarios/tabla-usuarios'])
            );
            Swal.fire({
              title: 'Registro',
              text: '¡El usuario se registró con éxito!',
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

    this.loading = true;

    console.log(this.registrarUsuariosForm.value);
  }
}
