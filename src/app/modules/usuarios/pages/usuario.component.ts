import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Router } from '@angular/router';
import { SearchUsuariosService } from '../../../core/services/search-usuarios.service';
import { DecimalPipe } from '@angular/common';
import { Usuario } from '../../../core/models/usuario';
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
  usuarios$: Observable<Usuario[]>;
  Usuarios: any = [];
  listUsuarios = false;
  error = '';

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public usuarioService: UsuarioService,
    public searchUsuariosService: SearchUsuariosService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.usuarios$ = this.searchUsuariosService.usuarios$;

    this.searchUsuariosService.usuarios$.subscribe({
      next: (data) => {
        if (this.usuarios$) {
          this.listUsuarios = true;
          console.log('entro a next', this.listUsuarios)
        }
      },
      error: (err) => {
        console.log('entro a error', this.listUsuarios)
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
          console.log('entro a error msh', err.error.msg)
        }
      },
    });

    this.total$ = this.searchUsuariosService.total$;
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
