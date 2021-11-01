import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SolicitudService } from '../../../core/services/solicitud.service';

import { Router } from '@angular/router';
import { SearchSolicitudesService } from '../../../core/services/search-solicitudes.service';

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
  // solicitudes$: Observable<Solicitud[]>;
  total$: Observable<number>;
  Solicitudes: any = [];
  listSolicitudes = false;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public solicitudService: SolicitudService,
    public searchSolicitudesService: SearchSolicitudesService,
    public router: Router
  ) {
    // this.solicitudes$ = solicitudService.getSolicitudes();
    this.total$ = searchSolicitudesService.total$;
    this.solicitudService.getSolicitudes().subscribe({
      next: (res) => {
        this.Solicitudes = res;
        if (this.Solicitudes.length !== 0) {
          this.listSolicitudes = true;
        }
      },
    });
  }

  ngOnInit(): void {
    // this.solicitudService.getSolicitudes().subscribe({
    //   next: (res) => {
    //     this.Solicitudes = res;
    //     if (this.Solicitudes.length !== 0) {
    //       this.listSolicitudes = true;
    //     }
    //   },
    // });
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
