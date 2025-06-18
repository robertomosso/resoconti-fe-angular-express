import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { CardComponent } from '../../shared/components/card/card.component';
import { AuthService } from '../../core/auth.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Component({
  selector: 'app-change-password',
  imports: [
    CardComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatError,
    MatButtonModule,
    MatButton,
    MatIconModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  hideCurrentPassword = true;
  hideNewPassword = true;

  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [this.authService.user?.email || '', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    })
  }

  get email() {
    return this.form.get('email');
  }

  get currentPassword() {
    return this.form.get('currentPassword');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  onSubmit() {
    const { email, currentPassword, newPassword } = this.form.getRawValue();

    if (email && currentPassword && newPassword) {
      this.authService.changePassword(email, currentPassword, newPassword)
        .subscribe({
          next: (res) => {
            this.authService.user = res.user;
            this.snackbarService.openSnackbar('Password aggiornata correttamente', 3000);
            this.router.navigate(['inserimento-resoconto']);
          },
          error: (err) => {
            this.errorHandlerService.handleErrors(err);
          }
        });
    } else {
      this.snackbarService.openSnackbar('Inserire tutti i dati correttamente');
    }
  }
}
