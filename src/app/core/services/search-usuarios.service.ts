import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap, map } from 'rxjs/operators';
import {
  SortColumn,
  SortDirection,
} from '../../shared/directives/sortable-header.directive';

import { HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { UsuarioService } from './usuario.service';

interface SearchResult {
  usuarios: Usuario[];
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

function sort(
  usuarios: Usuario[],
  column: SortColumn,
  direction: string
): Usuario[] {
  if (direction === '' || column === '') {
    return usuarios;
  } else {
    return [...usuarios].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(usuarios: Usuario, term: string, pipe: PipeTransform) {
  console.log('matcheeeeees', usuarios.nombre);
  return (
    usuarios.apellido.toLowerCase().includes(term.toLowerCase()) ||
    usuarios.nombre.toLowerCase().includes(term.toLowerCase()) ||
    usuarios.email.toLowerCase().includes(term.toLowerCase()) ||
    usuarios.departamentos.nombre.toLowerCase().includes(term.toLowerCase()) ||
    usuarios.departamentos.facultad.nombre
      .toLowerCase()
      .includes(term.toLowerCase()) ||
    pipe.transform(usuarios.identificacion).includes(term)
  );
}

@Injectable({
  providedIn: 'root',
})
export class SearchUsuariosService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _total$ = new BehaviorSubject<number>(0);
  private _usuarios$ = new BehaviorSubject<Usuario[]>([]);
  //public usuariosList = [];

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  // headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private pipe: DecimalPipe,
    private usuarioService: UsuarioService
  ) {
    // this.usuarioService.getUsuarios().subscribe({
    //   next: (res) => {
    //     this.usuariosList = res as Usuario[];
    //     console.log('subscription', res, this.usuariosList);
    //   },
    // });

    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        //debounceTime(200),
        switchMap(() => this._search()),
        //delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._usuarios$.next(result.usuarios);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  // SORTING AND FILTERING
  get usuarios$() {
    return this._usuarios$.asObservable();
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
    return this.usuarioService.getUsuarios().pipe(
      map((data) => {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } =
          this._state;

        let usuariosList: Usuario[] = [];
        if (data) {
          usuariosList = data; //.Accounts;
          console.log('========== From Service ==============');
          console.log('usuariosList', usuariosList);

          let usuarios = sort(usuariosList, sortColumn, sortDirection);

          // 2. filter
          usuarios = usuarios.filter((usuarios) =>
            matches(usuarios, searchTerm, this.pipe)
          );

          const total = usuarios.length;
          usuarios = usuarios.slice(
            (page - 1) * pageSize,
            (page - 1) * pageSize + pageSize
          );

          console.log('usuarios', usuarios);
          // map() operator will automatically convert the returned value into an observable for me
          return {
            usuarios,
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
