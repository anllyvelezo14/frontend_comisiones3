import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { EstadoService } from '../../../core/services/estado.service';
import { Estado } from '../../../core/models/estado';
import { EstadoSolicitudIntermediaService } from '../../../core/services/estado-solicitud-intermedia.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-asociar-estado',
  templateUrl: './asociar-estado.component.html',
  styleUrls: ['./asociar-estado.component.css'],
})
export class AsociarEstadoComponent implements OnInit {
  loading = false;
  submitted = false;
  error = '';
  getId$: any;
  estados$: Observable<Estado[]>;
  urlId: any;

  constructor(
    private formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private estadoSolicitudIntermediaService: EstadoSolicitudIntermediaService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.estados$ = this.estadoService.getEstados();

    this.getId$ = this.activateRoute.parent.parent.params.subscribe(
      (params) => {
        this.urlId = params.id;
      }
    );

    this.agregarEstadosForm.setValue({
      observacion: '',
      comisiones_id: this.urlId,
      estados_id: '',
    });
  }

  agregarEstadosForm = this.formBuilder.group({
    observacion: [''],
    comisiones_id: ['', Validators.required],
    estados_id: ['', Validators.required],
  });

  ngOnInit(): void {}

  get f() {
    return this.agregarEstadosForm.controls;
  }

  agregarEstado(): any {
    this.submitted = true;

    // stop here if form is invalid

    if (this.agregarEstadosForm.invalid) {
      return;
    }

    if (this.agregarEstadosForm.valid) {
      return this.estadoSolicitudIntermediaService
        .createEstadosSolicitudes(this.agregarEstadosForm.value)
        .subscribe({
          next: (res) => {
            this.ngZone.run(() => this.router.navigate(['/home/solicitudes']));
            Swal.fire({
              title: 'Creada',
              text: '¡Se asoció el estado a la comisión con éxito!',
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

    console.log(this.agregarEstadosForm.value);
  }
}
