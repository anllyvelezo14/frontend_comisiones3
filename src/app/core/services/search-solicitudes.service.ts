import { Injectable, PipeTransform } from '@angular/core';
import { async, BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap, map } from 'rxjs/operators';
import {
  SortColumn,
  SortDirection,
} from '../../shared/directives/sortable-header.directive';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Solicitud } from '../models/solicitud';
import { AuthService } from './auth.service';
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
  return (
    solicitudes.tipos_solicitud.nombre
      .toLowerCase()
      .includes(term.toLowerCase()) ||
    pipe.transform(solicitudes.createdAt).includes(term) ||
    pipe.transform(solicitudes.usuarios.nombre.toLowerCase()).includes(term) ||
    pipe
      .transform(solicitudes.usuarios.departamentos.nombre.toLowerCase())
      .includes(term)
  );
}

@Injectable({
  providedIn: 'root',
})
export class SearchSolicitudesService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _solicitudes$ = new BehaviorSubject<Solicitud[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public solicitudesList = [];

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private pipe: DecimalPipe,
    private authUser: AuthService,
    private solicitudService: SolicitudService
  ) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._solicitudes$.next(result.solicitudes);
        this._total$.next(result.total);
      });

    this._search$.next();

    this.solicitudService.getSolicitudes().subscribe({
      next: (res) => {
        this.solicitudesList = res as Solicitud[];
        console.log('subscription', res, this.solicitudesList);
      },
    });
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
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    let solicitudes = this.solicitudesList;

    console.log('solicitudesList', this.solicitudesList);
    console.log('solicitudes', solicitudes);

    // 2. filter
    solicitudes = solicitudes.filter((solicitud) =>
      matches(solicitud, searchTerm, this.pipe)
    );

    const total = solicitudes.length;

    // 3. paginate
    solicitudes = solicitudes.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ solicitudes, total });
  }
}
