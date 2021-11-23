import { Component, OnInit, OnDestroy } from '@angular/core';
import { SolicitudService } from '../../../../core/services/solicitud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Solicitud } from '../../../../core/models/solicitud';
import { Subscription, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css'],
})
export class VerSolicitudComponent implements OnInit {
  loading = false;
  submitted = false;
  error = '';
  solicitud: Solicitud;
  solicitud$: Observable<Solicitud>;
  Solicitudes: any = [];
  // = new Solicitud();
  // private subscription: Subscription;

  constructor(
    private solicitudService: SolicitudService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      const id = params.id;
      if (id) {
        this.solicitudService.getSolicitud(id).subscribe((resSolicitud) => {
          this.solicitud = resSolicitud;
          console.log(this.solicitud);
        });
      }
    });
  }

  delete(id: any): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta solicitud?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3AB795',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.delete(id).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/home/solicitudes']);
            Swal.fire({
              title: 'Eliminada!',
              text: '¡La solicitud ha sido eliminada!',
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
    });
  }
}
