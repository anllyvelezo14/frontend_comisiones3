import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CumplidoService } from '../../../core/services/cumplido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-cumplido',
  templateUrl: './subir-cumplido.component.html',
  styleUrls: ['./subir-cumplido.component.css'],
})
export class SubirCumplidoComponent implements OnInit {
  loading = false;
  submitted = false;
  error = '';
  getId$: any;
  urlId: any;

  constructor(
    private formBuilder: FormBuilder,
    private cumplidoService: CumplidoService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.getId$ = this.activateRoute.parent.parent.params.subscribe(
      (params) => {
        this.urlId = params.id;
      }
    );

    this.cumplidosForm.setValue({
      fecha_envio: '',
      fecha_confirmacion: '',
      informacion_complementaria: '',
      correos: '',
      comisiones_id: this.urlId,
    });
  }

  cumplidosForm = this.formBuilder.group({
    fecha_envio: [''],
    fecha_confirmacion: [''],
    informacion_complementaria: ['', Validators.required],
    correos: [''],
    comisiones_id: [''],
  });

  ngOnInit(): void {}

  get f() {
    return this.cumplidosForm.controls;
  }

  subirCumplido(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.cumplidosForm.invalid) {
      return;
    }

    if (this.cumplidosForm.valid) {
      return this.cumplidoService
        .createCumplido(this.cumplidosForm.value)
        .subscribe({
          next: (res) => {
            this.ngZone.run(() => this.router.navigate(['/home/solicitudes']));
            Swal.fire({
              title: 'Creado',
              text: '¡Se cumplido se creó con éxito!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            });
          },
          error: (err) => {
            if (err.status === 404 || err.status === 401) {
              this.error = err.error.msg;
              this.loading = false;
            }
          },
        });
    }

    this.loading = true;

    console.log(this.cumplidosForm.value);
  }
}
