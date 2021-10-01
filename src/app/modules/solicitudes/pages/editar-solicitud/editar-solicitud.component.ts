import { Component, OnInit, NgZone } from '@angular/core';
import { SolicitudService } from '../../../../core/services/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitud } from '../../../../core/models/solicitud';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css'],
})
export class EditarSolicitudComponent implements OnInit {
  solicitud: Solicitud;
  getId: any;
  updateSolicitud: FormGroup;

  constructor(
    private solicitudService: SolicitudService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.solicitudService.getSolicitud(this.getId).subscribe((res) => {
      this.updateSolicitud.setValue({
        tipos_solicitud_id: res.tipos_solicitud_id,
        justificacion: res.justificacion,
      });
    });

    this.updateSolicitud = this.formBuilder.group({
      tipos_solicitud_id: ['', Validators.required],
      justificacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onUpdate(): any {
    this.solicitudService
      .updateSolicitud(this.getId, this.updateSolicitud.value)
      .subscribe(() => {
        this.ngZone.run(() =>
          this.router.navigateByUrl('/home/solicitudes/tabla-solicitudes')
        );
      });
  }
}
