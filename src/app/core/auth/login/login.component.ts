import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  usuario: Usuario;
  loginForm = this.fb.group({
    email: [''],
    contrasena: [''],
  });

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;

    const formValue = this.loginForm.value;

    this.authenticationService.login(formValue).subscribe((res) => {
      this.router.navigateByUrl('/app-crear-solicitud');
    });
  }

  onLogout(): void {
    this.authenticationService.logout();
  }
}
