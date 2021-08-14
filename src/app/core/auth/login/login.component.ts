import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../modules/usuarios/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  usuario: Usuario;
  // returnUrl: string;
  // error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  get f() {
    return this.loginForm.controls;
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.usuario).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/app-crear-solicitud']);
    });
  }
}
