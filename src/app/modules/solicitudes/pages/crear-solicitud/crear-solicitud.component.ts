import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { SolicitudService } from '../../../../core/services/solicitud.service';
import { Solicitud } from '../../../../core/models/solicitud';
import { Router } from '@angular/router';
import { TipoSolicitudService } from '../../../../core/services/tipo-solicitud.service';
import { Observable } from 'rxjs';
import { TipoSolicitud } from '../../../../core/models/tipo-solicitud';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/core/models/usuario';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css'],
})
export class CrearSolicitudComponent implements OnInit {
  loading = false;
  submitted = false;
  lugar: boolean;
  idioma: boolean;
  justificacion: boolean;
  fecha: boolean;
  anexo: boolean;
  disponible: boolean;
  options$: Observable<TipoSolicitud[]>;
  usuario$: Observable<Usuario>;
  solicitud: Solicitud;
  error = '';

  constructor(
    private solicitudService: SolicitudService,
    private tipoSolicitudService: TipoSolicitudService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.options$ = this.tipoSolicitudService.getTipoSolicitud();
    //this.usuario$ = this.usuarioService.getUsuario();
  }

  crearSolicitudForm = this.formBuilder.group({
    tipos_solicitud_id: ['', Validators.required],
    justificacion: ['', Validators.required],
    // fecha_inicio: [''],
    // fecha_fin: [''],
    lugar: [''],
    idioma: [''],
    //anexo: [''],
    fechasInicioFin: ['']
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
    if (solicitud === '1') {
      //comision
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
    this.loading = true;

    // stop here if form is invalid

    if (this.crearSolicitudForm.invalid) {
      return;
    }

    if (this.crearSolicitudForm.valid) {
      

      // let myDateObj = this.crearSolicitudForm.value.fechasInicioFin.date;
      // let convertedDate =  new Date(
      //   myDateObj.year, 
      //   myDateObj.month-1, 
      //   myDateObj.day);

      //   let p = Object.assign({},this.solicitud, this.crearSolicitudForm.value, {
      //     fechasInicioFin: convertedDate
      //   });

        console.log('formulario crear',this.crearSolicitudForm.value);


      return this.solicitudService
        .createSolicitud(this.crearSolicitudForm.value)
        //.createSolicitud(p)
        .subscribe({
          next: (res) => {
            this.ngZone.run(() => this.router.navigate(['/home/solicitudes']));
            Swal.fire({
              title: 'Creada',
              text: '¡La solicitud se creó con éxito!',
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
}
