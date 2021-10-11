import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { SolicitudService } from '../../../../core/services/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitud } from '../../../../core/models/solicitud';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TipoSolicitudService } from '../../../../core/services/tipo-solicitud.service';
import { TipoSolicitud } from '../../../../core/models/tipo-solicitud';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css'],
})
export class EditarSolicitudComponent implements OnInit {
  solicitud: Solicitud;
  getId: any;
  updateSolicitud: FormGroup;
  loading = false;
  submitted = false;
  lugar = true;
  idioma = true;
  disponible = true;
  error = '';
  options$: Observable<TipoSolicitud[]>;

  constructor(
    private solicitudService: SolicitudService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.getId = this.activateRoute.snapshot.paramMap.get('id');

    this.solicitudService.getSolicitud(this.getId).subscribe({
      next: (res) => {
        this.updateSolicitud.setValue({
          tipos_solicitud: res.tipos_solicitud.nombre,
          justificacion: res.justificacion,
          lugar: res.lugar,
          idioma: res.idioma,
        });
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg; // mensaje desde el back
          this.loading = false;
        }
      },
    });

    this.updateSolicitud = this.formBuilder.group({
      tipos_solicitud: [''],
      justificacion: ['', Validators.required],
      lugar: [''],
      idioma: [''],
    });
  }

  ngOnInit(): void {
    // this.solicitudService
    //   .getSolicitud(this.getId)
    //   .subscribe((res) => (this.tiposSolicitud = res));
    // console.log('tipo solicitudddd', this.tiposSolicitud);
    // this.tiposSolicitud = this.updateSolicitud.controls.tipos_solicitud;
    // console.log('solcitudddd', this.tiposSolicitud);
    // console.log(this.updateSolicitud.value);
    // if (this.tiposSolicitud === 'comision') {
    //   this.lugar = true;
    //   this.idioma = true;
    //   this.disponible = true;
    // }
  }

  // convenience getters for easy access to form fields
  get f() {
    return this.updateSolicitud.controls;
  }

  onUpdate(): any {
    this.submitted = true;

    // stop here if form is invalid

    if (this.updateSolicitud.invalid) {
      return;
    }

    this.solicitudService
      .updateSolicitud(this.getId, this.updateSolicitud.value)
      .subscribe({
        next: (res) => {
          this.ngZone.run(() =>
            this.router.navigateByUrl('/home/solicitudes/tabla-solicitudes')
          );
          Swal.fire({
            title: 'Actulizada',
            text: '¡La solicitud se actualizó con éxito!',
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
