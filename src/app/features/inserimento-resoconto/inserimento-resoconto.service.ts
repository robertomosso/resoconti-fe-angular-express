import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resoconto } from '../../shared/interfaces/resoconto';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InserimentoResocontoService {

  userId!: string;
  userName!: string;

  constructor(private readonly httpClient: HttpClient) { }

  getUltimoResocontoByUser(): Observable<Resoconto> {
    return this.httpClient.get<Resoconto>(`${environment.baseUrl}/resoconto`);
  }
  
  inserisciResoconto(body: Partial<Resoconto>): Observable<any> {
    return this.httpClient.post<Resoconto>(`${environment.baseUrl}/resoconto`, body);
  }
}
