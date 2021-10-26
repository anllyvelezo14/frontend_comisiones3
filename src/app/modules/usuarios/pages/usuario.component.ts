import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../../core/services/usuario.service';
import { SearchSolicitudesService } from '../../../core/services/search-solicitudes.service';
import { Router } from '@angular/router';
import {
  NgbdSortableHeader,
  SortEvent,
} from '../../../shared/directives/sortable-header.directive';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  Usuarios: any = [];
  listUsuarios = false;
  error = '';

  constructor(public usuarioService: UsuarioService, public router: Router) {}

  ngOnInit(): void {
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
}
