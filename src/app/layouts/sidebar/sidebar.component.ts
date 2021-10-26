import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public _opened: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  ngOnInit(): void {}

  public _toggleSidebar() {
    this._opened = !this._opened;
    // console.log(this._opened);
  }

  Name = 'Daniela Andrea';
  LastName = 'Torres Gómez';
  Role = 'Usuario';

  onLogout(): void {
    this.router.navigate(['/login']);
    this.authenticationService.logout();
  }

  irCrearSolicitud(): void {
    this.router.navigateByUrl('/home/crear-solicitud');
  }

  irAsociarEstado(): void {
    this.router.navigateByUrl('/estado');
  }

  irPerfil(): void {
    const id = localStorage.getItem('ACCESS_USER_ID') || null;
    console.log('ID DEL USER', id);
    this.router.navigateByUrl(`/usuarios/ver-perfil/${id}`);
  }

  verUsuarios(): void {
    this.router.navigateByUrl('/usuarios/tabla-usuarios');
  }
}
