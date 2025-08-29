import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { Role } from '../../shared/enums/role.enum';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-register',
  imports: [
    CardComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatSelectModule,
    MatError,
    MatButtonModule,
    MatIconModule,
    MatButton,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  public Role = Role;

  hidePassword = true;

  fileIdRequired = signal(false);

  form!: FormGroup;

  roles = [
    {
      role: 'admin',
      label: 'Admin',
    },
    {
      role: 'user',
      label: 'User',
    },
  ];

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private readonly fb: FormBuilder,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      role: ['', Validators.required],
      fileId: [''],
    })

    if (!this.userService.databaseHasUser()) {
      this.form.patchValue({ role: Role.Admin });
    }
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

  get role() {
    return this.form.get('role');
  }

  get fileId() {
    return this.form.get('fileId');
  }

  onRoleChange(event: MatSelectChange) {
    if (event.value === Role.User) {
      this.fileId?.setValidators(Validators.required);
      this.fileIdRequired.set(true);
    } else {
      this.fileId?.clearValidators();
      this.fileIdRequired.set(false);
    }
    
    this.fileId?.updateValueAndValidity();
  }

  onSubmit() {
    const { name, email, password, role, fileId } = this.form.getRawValue();

    if (email && password) {
      this.authService.register(name, email, password, role, fileId)
        .subscribe({
          next: (res) => {
            this.userService.databaseHasUser.set(true);
            this.snackbarService.openSnackbar(res.message, 3000);
            this.router.navigate(['visualizza-resoconti']);
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
