import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/auth.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    })
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    const { email, password } = this.form.getRawValue();

    if (email && password) {
      this.authService.login(email, password)
        .subscribe({
          next: (res) => {
            this.snackbarService.openSnackbar(res.message, 3000);

            this.authService.token = res.token;
            this.authService.user = res.user;

            if (this.authService.user?.mustChangePassword) {
              this.router.navigate(['change-password']);
            } else {
              this.router.navigate(['inserimento-resoconto']);
            }
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
