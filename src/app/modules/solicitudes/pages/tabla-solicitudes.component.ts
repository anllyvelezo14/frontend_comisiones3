import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SolicitudService } from '../../../core/services/solicitud.service';
import { Solicitud } from '../../../core/models/solicitud';
import { Router, ActivatedRoute } from '@angular/router';

import {
  NgbdSortableHeader,
  SortEvent,
} from '../../../shared/directives/sortable-header.directive';

@Component({
  selector: 'app-tabla-solicitudes',
  templateUrl: './tabla-solicitudes.component.html',
  styleUrls: ['./tabla-solicitudes.component.css'],
  providers: [SolicitudService, DecimalPipe],
})
export class TablaSolicitudesComponent {
  //implements OnInit {
  solicitudes$: Observable<Solicitud[]>;
  total$: Observable<number>;
  solicitudes: Solicitud[];
  // solicitudes: Solicitud[];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public solicitudService: SolicitudService,
    public router: Router
  ) {
    this.solicitudes$ = solicitudService.getSolicitudes();
    this.total$ = solicitudService.total$;
  }

  // ngOnInit(): void {
  //   this.solicitudService.getSolicitudes().subscribe((res)=> this.solicitudes = res)
  // }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.solicitudService.sortColumn = column;
    this.solicitudService.sortDirection = direction;
  }
}
