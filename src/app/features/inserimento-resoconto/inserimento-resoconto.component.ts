import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { formatDateToUsDate } from '../../shared/utils/date-formatter';
import { CardComponent } from '../../shared/components/card/card.component';
import { InserimentoResocontoService } from './inserimento-resoconto.service';
import { Resoconto } from '../../shared/interfaces/resoconto';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { AuthService } from '../../core/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inserimento-resoconto',
  imports: [
    CardComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './inserimento-resoconto.component.html',
  styleUrl: './inserimento-resoconto.component.css',
})
export class InserimentoResocontoComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly inserimentoResocontoService: InserimentoResocontoService,
    private readonly snackbarService: SnackbarService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly spinnerService: SpinnerService,
  ) { }

  userName = signal('');
  message = signal('Inserisci di seguito il tuo resoconto settimanale:')
  submitButtonVisibility = signal(true);

  form!: FormGroup
  ultimoResoconto: Resoconto | null = null;

  tipoAttivita = [
    'Affiancamento',
    'Sviluppo',
    'Testing',
    'Documentazione',
    'Risoluzione ticket',
    'Formazione',
  ];

  ngOnInit(): void {
    this.userName.set(this.authService.user?.name ?? '');

    this.form = this.formBuilder.group({
      dataInizio: [{ value: '', disabled: true }],
      dataFine: [{ value: '', disabled: true }],
      tipoAttivita: ['', Validators.required],
      attivita: ['', Validators.required],
      descrizione: ['', Validators.required],
      personaRiferimento: ['', Validators.required],
      cliente: ['', Validators.required],
      colleghiSI: [''],
      note: [''],
    });

    this.setWeekDates();
    this.getUltimoResocontoByUser();
  }

  setWeekDates() {
    let startOfWeek = new Date();
    let endOfWeek = new Date();
    let dayOfWeek = startOfWeek.getDay();

    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1);
    endOfWeek.setDate(endOfWeek.getDate() - dayOfWeek + 5);

    const monday = formatDateToUsDate(startOfWeek);
    const friday = formatDateToUsDate(endOfWeek);

    this.form.get('dataInizio')?.setValue(monday);
    this.form.get('dataFine')?.setValue(friday);
  }

  getUltimoResocontoByUser() {
    this.inserimentoResocontoService.getUltimoResocontoByUser().subscribe({
      next: (res) => {
        this.ultimoResoconto = res;

        // il form viene valorizzato solo se le date correnti corrispondono con l'ultimo resoconto trovato di quell'utente
        if (this.ultimoResoconto) {
          this.form.patchValue({
            tipoAttivita: this.ultimoResoconto.tipoAttivita,
            attivita: this.ultimoResoconto.attivita,
            descrizione: this.ultimoResoconto.descrizione,
            personaRiferimento: this.ultimoResoconto.personaRiferimento,
            cliente: this.ultimoResoconto.cliente,
            colleghiSI: this.ultimoResoconto.colleghiSI,
            note: this.ultimoResoconto.note,
          });

          const dataInizio = this.form.get('dataInizio')?.value;
          const dataFine = this.form.get('dataFine')?.value;

          if (
            dataInizio === this.ultimoResoconto.dataInizio &&
            dataFine === this.ultimoResoconto.dataFine
          ) {
            this.resocontoGiaInserito();
          }
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status !== 404) {
          this.snackbarService.openSnackbar(err.error?.message || 'Errore del server');
        }
      }
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const body: Partial<Resoconto> = {
        dataInizio: this.form.get('dataInizio')?.value,
        dataFine: this.form.get('dataFine')?.value,
        tipoAttivita: this.form.get('tipoAttivita')?.value?.trim(),
        attivita: this.form.get('attivita')?.value?.trim(),
        descrizione: this.form.get('descrizione')?.value?.trim(),
        personaRiferimento: this.form.get('personaRiferimento')?.value?.trim(),
        cliente: this.form.get('cliente')?.value?.trim(),
        colleghiSI: this.form.get('colleghiSI')?.value?.trim(),
        note: this.form.get('note')?.value?.trim(),
        userId: this.authService.user?.id ?? '',
      };

      this.inserisciResoconto(body);
    } else {
      this.snackbarService.openSnackbar('Attenzione, il form non risulta compilato correttamente');
    }
  }

  inserisciResoconto(body: Partial<Resoconto>) {
    this.spinnerService.showSpinner.next(true);

    this.inserimentoResocontoService.inserisciResoconto(body).subscribe({
      next: () => {
        this.snackbarService.openSnackbar('Inserimento avvenuto con successo!');
        this.resocontoGiaInserito();
        this.spinnerService.showSpinner.next(false);
      },
      error: (err) => {
        this.spinnerService.showSpinner.next(false);
        this.errorHandlerService.handleErrors(err);
      }
    });
  }

  private resocontoGiaInserito(): void {
    this.submitButtonVisibility.set(false);
    this.form.disable();
    this.message.set('Resoconto già inserito per questa settimana');
  }

  logout() {
    this.authService.logout();
  }

}
