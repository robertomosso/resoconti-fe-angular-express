import { Injectable } from '@angular/core';

import { SnackbarService } from './snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private readonly snackbarService: SnackbarService) { }

  handleErrors(error: unknown) {
    if (error instanceof HttpErrorResponse) {
      this.snackbarService.openSnackbar(error.error.message);
    } else {
      this.snackbarService.openSnackbar('Si è verificato un errore');
    }
  }
}
