import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SolicitudService } from '../../../core/services/solicitud.service';

import { Router } from '@angular/router';
import { SearchSolicitudesService } from '../../../core/services/search-solicitudes.service';
import { Solicitud } from '../../../core/models/solicitud';

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
export class TablaSolicitudesComponent implements OnInit {
  solicitudes$: Observable<Solicitud[]>;
  total$: Observable<number>;
  Solicitudes: any = [];
  listSolicitudes = false;
  error = '';

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public solicitudService: SolicitudService,
    public searchSolicitudesService: SearchSolicitudesService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.solicitudes$ = this.searchSolicitudesService.solicitudes$;

    this.searchSolicitudesService.solicitudes$.subscribe({
      next: (data) => {
        console.log('---- In component --', data);
        if (this.solicitudes$) {
          this.listSolicitudes = true;
        }
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
      },
    });

    this.total$ = this.searchSolicitudesService.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.searchSolicitudesService.sortColumn = column;
    this.searchSolicitudesService.sortDirection = direction;
  }
}
