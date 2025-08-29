import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private readonly snackBar: MatSnackBar) { }

  openSnackbar(message: string, duration = 10000) {
    this.snackBar.open(message, 'Chiudi', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
