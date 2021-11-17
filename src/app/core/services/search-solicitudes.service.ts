import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap, map } from 'rxjs/operators';
import {
  SortColumn,
  SortDirection,
} from '../../shared/directives/sortable-header.directive';

import { HttpHeaders } from '@angular/common/http';
import { Solicitud } from '../models/solicitud';
import { SolicitudService } from './solicitud.service';

interface SearchResult {
  solicitudes: Solicitud[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

// function sort(
//   solicitudes: Solicitud[],
//   column: SortColumn,
//   direction: string
// ): Solicitud[] {
//   if (direction === '' || column === '') {
//     return solicitudes;
//   } else {
//     return [...solicitudes].sort((a, b) => {
//       const res = compare(a[column], b[column]);
//       return direction === 'asc' ? res : -res;
//     });
//   }
// }

function matches(solicitudes: Solicitud, term: string, pipe: PipeTransform) {
  console.log('solicitudes.estadoActual',solicitudes.nombreEstadoActual);
  return (
    
    solicitudes.tipos_solicitud.nombre
      .toLowerCase()
      .includes(term.toLowerCase()) ||
    solicitudes.usuarios.nombre.toLowerCase().includes(term) ||
    solicitudes.usuarios.apellido.toLowerCase().includes(term) ||
    solicitudes.usuarios.departamentos.nombre.toLowerCase().includes(term) ||
    solicitudes.nombreEstadoActual.toLowerCase().includes(term) ||
    pipe.transform(solicitudes.id).includes(term) 
  );
}

@Injectable({
  providedIn: 'root',
})
export class SearchSolicitudesService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _total$ = new BehaviorSubject<number>(0);
  private _solicitudes$ = new BehaviorSubject<Solicitud[]>([]);
  // public solicitudesList = [];

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(
    private pipe: DecimalPipe,
    private solicitudService: SolicitudService
  ) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        //debounceTime(200),
        switchMap(() => this._search()),
        //delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._solicitudes$.next(result.solicitudes);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  // SORTING AND FILTERING
  get solicitudes$() {
    return this._solicitudes$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  // Set and search:

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    // ALL THE CODE GOES INSIDE THE server call
    return this.solicitudService.getSolicitudes().pipe(
      map((data) => {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } =
          this._state;

        let solicitudesList: Solicitud[] = [];

        if (data) {
          solicitudesList = data;
          // console.log('========== From Service ==============');
          // console.log('solicitudesList', solicitudesList);

          //let solicitudes = sort(solicitudesList, sortColumn, sortDirection);

          // 2. filter

          let solicitudes = solicitudesList.filter((solicitudes) =>
            matches(solicitudes, searchTerm, this.pipe)
          );

          const total = solicitudes.length;
          solicitudes = solicitudes.slice(
            (page - 1) * pageSize,
            (page - 1) * pageSize + pageSize
          );

          console.log('solicitudes', solicitudes);
          // map() operator will automatically convert the returned value into an observable for me
          return {
            solicitudes,
            total,
          };
        } else {
          // In case data is null
          return null;
        }
      })
    );
  }
}
