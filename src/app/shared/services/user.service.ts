import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { HasUserResponse } from '../interfaces/has-user-response.interface';
import { GetUsersResponse } from '../interfaces/get-users-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) { }

    hasUser(): Observable<HasUserResponse> {
      return this.httpClient.get<HasUserResponse>(`${environment.baseUrl}/users/has-user`);
    }
    
    getUsers() {
      return this.httpClient.get<GetUsersResponse>(`${environment.baseUrl}/users/get-users`);
    }
  
}
