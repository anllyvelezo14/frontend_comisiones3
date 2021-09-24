import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { SolicitudService } from '../../../../core/services/solicitud.service';
import { Solicitud } from '../../../../core/models/solicitud';
import { Router } from '@angular/router';
import { TipoSolicitudService } from '../../../../core/services/tipo-solicitud.service';
import { Observable } from 'rxjs';
import { TipoSolicitud } from '../../../../core/models/tipo-solicitud';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css'],
})
export class CrearSolicitudComponent implements OnInit {
  private solicitud: Solicitud = new Solicitud();
  loading = false;
  submitted = false;
  lugar: boolean;
  idioma: boolean;
  justificacion: boolean;
  fecha: boolean;
  anexo: boolean;
  disponible: boolean;
  options$: Observable<TipoSolicitud[]>;

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private solicitudService: SolicitudService,
    private router: Router,
    private ngZone: NgZone,
    private tipoSolicitudService: TipoSolicitudService
  ) {
    this.options$ = this.tipoSolicitudService.getTipoSolicitud();
  }

  crearSolicitudForm = this.formBuilder.group({
    tipos_solicitud: ['', Validators.required],
    justificacion: ['', Validators.required],
    lugar: [''],
    idioma: [''],
  });

  ngOnInit(): void {
    this.lugar = false;
    this.idioma = false;
    this.justificacion = false;
    this.fecha = false;
    this.anexo = false;
    this.disponible = false;
  }

  // convenience getters for easy access to form fields
  get f() {
    return this.crearSolicitudForm.controls;
  }

  onChangeSolicitud(e): void {
    const solicitud = e.target.value || null;
    if (solicitud === 'comision') {
      this.lugar = true;
      this.idioma = true;
      this.disponible = false;
    } else {
      this.lugar = false;
      this.idioma = false;
      this.disponible = true;
    }
    this.justificacion = true;
    this.anexo = true;
    this.fecha = true;

    this.cd.detectChanges();
  }

  crearSolicitud(): any {
    this.submitted = true;

    // stop here if form is invalid

    if (this.crearSolicitudForm.invalid) {
      return;
    }

    if (this.crearSolicitudForm.valid) {
      console.log('valid form');
      return this.solicitudService
        .createSolicitud(this.crearSolicitudForm.value)
        .subscribe((res) => {
          this.ngZone.run(() =>
            this.router.navigate(['/home/crear-solicitud'])
          );
        });
    }

    this.loading = true;

    console.log(this.crearSolicitudForm.value);
  }
}
