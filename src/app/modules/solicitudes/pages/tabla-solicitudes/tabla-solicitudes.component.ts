import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Country } from 'src/app/core/models/country';
import { CountryService } from '../../../../core/services/country.service';

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
export class TablaSolicitudesComponent {
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
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
