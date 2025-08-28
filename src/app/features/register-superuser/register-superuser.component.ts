import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CardComponent } from '../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-register',
  imports: [
    CardComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatError,
    MatButtonModule,
    MatIconModule,
    MatButton,
  ],
  templateUrl: './register-superuser.component.html',
  styleUrl: './register-superuser.component.css'
})
export class RegisterSuperuserComponent implements OnInit {

  hidePassword = true;

  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      fileId: [''],
    })
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    const { name, email, password, fileId } = this.form.getRawValue();

    if (name && email && password) {
      this.authService.registerSuperuser(name, email, password, fileId)
        .subscribe({
          next: (res) => {
            this.snackbarService.openSnackbar(res.message, 3000);
            this.router.navigate(['login']);
          },
          error: (err) => {
            this.errorHandlerService.handleErrors(err);
          }
        });
    } else {
      this.snackbarService.openSnackbar('Credenziali non valide');
    }
  }

}
