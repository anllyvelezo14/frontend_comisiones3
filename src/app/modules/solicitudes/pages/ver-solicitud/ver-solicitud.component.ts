import { Component, OnInit, OnDestroy } from '@angular/core';
import { SolicitudService } from '../../../../core/services/solicitud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Solicitud } from '../../../../core/models/solicitud';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css'],
})
export class VerSolicitudComponent implements OnInit {
  solicitud: Solicitud; // = new Solicitud();
  private subscription: Subscription;

  constructor(
    private solicitudService: SolicitudService,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe((params) => {
      const id = params.id;
      if (id) {
        this.solicitudService
          .getSolicitud(id)
          .subscribe((resSolicitud) => (this.solicitud = resSolicitud));
      }
    });
  }

  ngOnInit(): void {
    // this.verSolicitud();
  }
  // ngOnDestroy():void {
  //   this.subscription.unsubscribe();
  // }

  // verSolicitud(): void {
  //   this.activateRoute.params.subscribe((params) => {
  //     const id = params.id;
  //     if (id) {
  //       this.solicitudService
  //         .getSolicitud(id)
  //         .subscribe((response) => (this.solicitud = response));
  //       console.log('solicitud: ', this.solicitud);
  //     }
  //   });
  // }
}
