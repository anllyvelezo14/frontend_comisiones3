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
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

const URL = 'http://localhost:3000/file/upload';

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

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  uploader:FileUploader = new FileUploader({url:URL});

  attachmentList:any = [];

  constructor(
    private solicitudService: SolicitudService,
    private tipoSolicitudService: TipoSolicitudService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private ngZone: NgZone,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.options$ = this.tipoSolicitudService.getTipoSolicitud();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 2);

    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      this.attachmentList.push(JSON.parse(response));
    }
    //this.usuario$ = this.usuarioService.getUsuario();
  }

  // ----------- FORM  -----------
  crearSolicitudForm = this.formBuilder.group({
    tipos_solicitud_id: ['', Validators.required],
    justificacion: ['', Validators.required],
    fecha_inicio: [''],
    fecha_fin: [''],
    lugar: [''],
    idioma: [''],
    //anexo: [''],
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

  newDateFormat(date) {
    const fechaInicioObject = date;

    const convertedDate = new Date(
      fechaInicioObject.year,
      fechaInicioObject.month - 1,
      fechaInicioObject.day
    );

    return convertedDate;
  }

  // ------------- CREAR SOLICITUD  -------------

  crearSolicitud(): any {
    this.submitted = true;

    // stop here if form is invalid

    if (this.crearSolicitudForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.crearSolicitudForm.valid) {
      const newForm = Object.assign(
        {},
        this.solicitud,
        this.crearSolicitudForm.value,
        {
          fecha_inicio: this.newDateFormat(this.fromDate),
          fecha_fin: this.newDateFormat(this.toDate),
        }
      );

      console.log('luego del converter', newForm);

      return this.solicitudService.createSolicitud(newForm).subscribe({
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

  // ------------- DATEPICKER -------------

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
