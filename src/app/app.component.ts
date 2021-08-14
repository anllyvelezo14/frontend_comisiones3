import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Usuario } from './modules/usuarios/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontendcomisiones3';
}
