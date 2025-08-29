import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserModel } from '../interfaces/user.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { Role } from '../interfaces/role.enum';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Partial<UserModel> | null = null;
  token: string | null = null;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
  ) { }

  registerSuperuser(name: string, email: string, password: string, fileId = null): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(`${environment.baseUrl}/auth/register-superuser`, {
      name,
      email,
      password,
      fileId
    });
  }

  register(name: string, email: string, password: string, role = Role.User, fileId = null): Observable<RegisterResponse> {
    const endpoint = role === Role.Admin ? 'register-admin' : 'register-user';

    return this.httpClient.post<RegisterResponse>(`${environment.baseUrl}/auth/${endpoint}`, {
      name,
      email,
      password,
      role,
      fileId
    });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.baseUrl}/auth/login`, {
      email,
      password,
    });
  }

  changePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/auth/change-password`, {
      email,
      currentPassword,
      newPassword,
    });
  }

  logout() {
    this.token = null;
    this.user = null;
    this.router.navigate(['login']);
    this.snackbarService.openSnackbar('Logout avvenuto con successo!');
  }
}
