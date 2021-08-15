import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Usuario } from './core/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontendcomisiones3';
}
