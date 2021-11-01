import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../../../core/services/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../../core/models/usuario';
import { UsuarioService } from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css'],
})
export class VerPerfilComponent implements OnInit {
  usuario: Usuario;
  error = '';

  constructor(
    private usuarioService: UsuarioService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      const id = params.id;
      if (id) {
        this.usuarioService.getUsuario(id).subscribe({
          next: (resUsuario) => {
            this.usuario = resUsuario;
          },
          error: (err) => {
            if (err.status === 404 || err.status === 401) {
              this.error = err.error.msg;
            }
          },
        });
      }
    });
  }
}
