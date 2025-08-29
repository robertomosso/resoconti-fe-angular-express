import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { HasUserResponse } from '../interfaces/has-user-response.interface';
import { GetUsersResponse } from '../interfaces/get-users-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * signal che indica la presenza di utenti registrati sul database
   * necessario per registrazione primo utente come admin, tramite il settaggio del ruolo admin di default
   * nella pagina di registrazione.
   * Parte a null e viene settato solamente tramite la loginGuard, per evitare che se si prova ad andare su register si passi il controllo presente
   * nell'onlyAdminGuard
   */
  databaseHasUser = signal<boolean | null>(null);

  constructor(private readonly httpClient: HttpClient) { }

    hasUser(): Observable<HasUserResponse> {
      return this.httpClient.get<HasUserResponse>(`${environment.baseUrl}/users/has-user`);
    }
    
    getUsers() {
      return this.httpClient.get<GetUsersResponse>(`${environment.baseUrl}/users/get-users`);
    }
  
}
