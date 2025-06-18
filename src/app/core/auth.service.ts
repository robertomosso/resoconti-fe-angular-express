import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SnackbarService } from '../shared/services/snackbar.service';
import { LoginResponse } from '../shared/interfaces/login-response';
import { UserModel } from '../shared/interfaces/user';
import { environment } from '../../environments/environment';

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
    this.router.navigate(['login']);
    this.snackbarService.openSnackbar('Logout avvenuto con successo!');
  }
  
}
