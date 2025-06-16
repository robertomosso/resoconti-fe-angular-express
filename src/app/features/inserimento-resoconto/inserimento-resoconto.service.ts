import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resoconto } from '../../shared/interfaces/resoconto';
import { AuthService } from '../../core/auth.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InserimentoResocontoService {

  userId!: string;
  userName!: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
  ) { }

  getUltimoResocontoByUser(): Observable<Resoconto> {
    const header = {
      headers: new HttpHeaders().set('Authorization',  this.authService.token ?? '')
    }
    return this.httpClient.get<Resoconto>(`${environment.baseUrl}/resoconto`, header);
  }
  
  inserisciResoconto(body: Partial<Resoconto>): Observable<any> {
    const header = {
      headers: new HttpHeaders().set('Authorization',  this.authService.token ?? '')
    }
    return this.httpClient.post<Resoconto>(`${environment.baseUrl}/resoconto`, body, header);
  }
}
