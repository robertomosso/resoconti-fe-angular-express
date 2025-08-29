import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { VisualizzaResocontiResponse } from '../interfaces/visualizza-resoconti-response.interface';
import { environment } from '../../../environments/environment';
import { Resoconto } from '../interfaces/resoconto.interface';

@Injectable({
  providedIn: 'root'
})
export class ResocontoService {

  constructor(private readonly httpClient: HttpClient) { }

  getResocontiUtente(userId: string) {
    return this.httpClient.get<VisualizzaResocontiResponse>(`${environment.baseUrl}/resoconto/resoconti-utente/${userId}`);
  }

  getUltimoResocontoByUser(): Observable<Resoconto> {
    return this.httpClient.get<Resoconto>(`${environment.baseUrl}/resoconto/ultimo-resoconto`);
  }

  inserisciResoconto(body: Partial<Resoconto>): Observable<any> {
    return this.httpClient.post<Resoconto>(`${environment.baseUrl}/resoconto/inserisciResoconto`, body);
  }
}
