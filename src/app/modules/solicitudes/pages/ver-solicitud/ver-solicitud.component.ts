import { Component, OnInit, OnDestroy } from '@angular/core';
import { SolicitudService } from '../../../../core/services/solicitud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Solicitud } from '../../../../core/models/solicitud';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css'],
})
export class VerSolicitudComponent implements OnInit {
  solicitud: Solicitud; // = new Solicitud();
  // private subscription: Subscription;
  solicitud$: Observable<Solicitud>;

  constructor(
    private solicitudService: SolicitudService,
    private activateRoute: ActivatedRoute,
    private router: Router
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

  ngOnInit(): void {}
}
