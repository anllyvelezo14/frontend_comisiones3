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
import { first, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // private subscription: Subscription;

  private isEmailValid = /^[a-zA-Z0-9._%+-]+@udea.edu.co$/;
  loading = false;
  submitted = false;
  usuario: Usuario;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.isEmailValid)]],
    contrasena: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private formBuilder: FormBuilder
  ) {
    // redirect to home if already logged in
    if (!this.authenticationService.isLogged) {
      this.router.navigate(['/app-crear-solicitud']);
    }
  }

  ngOnInit(): void {}

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  onSubmit(): void {
    const formValue = this.loginForm.value;
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authenticationService.login(formValue).subscribe((res) => {
      this.router.navigateByUrl('/app-crear-solicitud');
    });
  }
}
