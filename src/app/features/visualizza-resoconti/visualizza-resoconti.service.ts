import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { VisualizzaResocontiResponse } from '../../shared/interfaces/visualizza-resoconti-response.interface';

@Injectable({
  providedIn: 'root'
})
export class VisualizzaResocontiService {

  constructor(private readonly httpClient: HttpClient) { }

  getResocontiUtente(userId: string) {
    return this.httpClient.get<VisualizzaResocontiResponse>(`${environment.baseUrl}/resoconto/resoconti-utente/${userId}`);
  }
}
