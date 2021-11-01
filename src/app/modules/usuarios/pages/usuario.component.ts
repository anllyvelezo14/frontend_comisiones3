import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Router } from '@angular/router';
import { SearchUsuariosService } from '../../../core/services/search-usuarios.service';
import { DecimalPipe } from '@angular/common';
import {
  NgbdSortableHeader,
  SortEvent,
} from '../../../shared/directives/sortable-header.directive';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService, DecimalPipe],
})
export class UsuarioComponent implements OnInit {
  total$: Observable<number>;
  Usuarios: any = [];
  listUsuarios = false;
  error = '';

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public usuarioService: UsuarioService,
    public searchUsuariosService: SearchUsuariosService,
    public router: Router
  ) {
    this.total$ = searchUsuariosService.total$;
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => {
        this.Usuarios = res;
        if (this.Usuarios.length !== 0) {
          this.listUsuarios = true;
        }
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
      },
    });
  }

  ngOnInit(): void {
    // this.usuarioService.getUsuarios().subscribe({
    //   next: (res) => {
    //     this.Usuarios = res;
    //     if (this.Usuarios.length !== 0) {
    //       this.listUsuarios = true;
    //     }
    //   },
    //   error: (err) => {
    //     if (err.status === 404 || err.status === 401) {
    //       this.error = err.error.msg;
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

    this.searchUsuariosService.sortColumn = column;
    this.searchUsuariosService.sortDirection = direction;
  }
}
