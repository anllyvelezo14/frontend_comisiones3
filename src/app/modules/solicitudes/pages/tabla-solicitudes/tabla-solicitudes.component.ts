import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Country } from 'src/app/core/models/country';
import { CountryService } from '../../../../core/services/country.service';
import { SolicitudService } from '../../../../core/services/solicitud.service';
import { Solicitud } from '../../../../core/models/solicitud';

import {
  NgbdSortableHeader,
  SortEvent,
} from '../../../../shared/directives/sortable-header.directive';

@Component({
  selector: 'app-tabla-solicitudes',
  templateUrl: './tabla-solicitudes.component.html',
  styleUrls: ['./tabla-solicitudes.component.css'],
  providers: [CountryService, DecimalPipe],
})
export class TablaSolicitudesComponent implements OnInit {
  countries$: Observable<Country[]>;
  total$: Observable<number>;
  solicitudes: Solicitud[];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public service: CountryService,
    public solicitudService: SolicitudService
  ) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.solicitudService
      .getSolicitudes()
      .subscribe((solicitudes) => (this.solicitudes = solicitudes));
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
