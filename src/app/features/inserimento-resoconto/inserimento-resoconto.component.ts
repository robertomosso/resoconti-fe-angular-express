import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpErrorResponse } from '@angular/common/http';

import { formatDateToUsDate } from '../../shared/utils/date-formatter';
import { CardComponent } from '../../shared/components/card/card.component';
import { Resoconto } from '../../shared/interfaces/resoconto.interface';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { AuthService } from '../../shared/services/auth.service';
import { ResocontoService } from '../../shared/services/resoconto.service';

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

  userName = signal('');
  message = signal('Inserisci di seguito il tuo resoconto settimanale:');
  submitButtonVisibility = signal(true);
  endDateLastResoconto = '';

  tipoAttivita = [
    'Affiancamento',
    'Sviluppo',
    'Testing',
    'Documentazione',
    'Risoluzione ticket',
    'Formazione',
    'Altro',
  ];

  form!: FormGroup;

  ultimoResoconto: Resoconto | null = null;

  campoObbligatorio = 'Il campo è obbligatorio';

  attivitaMaxLength = 100;
  descrizioneMaxLength = 500;
  personaRiferimentoMaxLength = 100;
  clienteMaxLength = 100;
  colleghiSIMaxLength = 500;
  noteMaxLength = 500;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly resocontoService: ResocontoService,
    private readonly snackbarService: SnackbarService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.userName.set(this.authService.user?.name ?? '');

    this.form = this.formBuilder.group({
      dataInizio: [''],
      dataFine: [''],
      tipoAttivita: ['', Validators.required],
      attivita: ['', [Validators.required, Validators.maxLength(this.attivitaMaxLength)]],
      descrizione: ['', [Validators.required, Validators.maxLength(this.descrizioneMaxLength)]],
      personaRiferimento: ['', [Validators.required, Validators.maxLength(this.personaRiferimentoMaxLength)]],
      cliente: ['', [Validators.required, Validators.maxLength(this.clienteMaxLength)]],
      colleghiSI: ['', Validators.maxLength(this.colleghiSIMaxLength)],
      note: ['', Validators.maxLength(this.noteMaxLength)],
    });

    this.setWeekDates();
    this.getUltimoResocontoByUser();
  }

  get attivita() {
    return this.form.get('attivita');
  }

  get descrizione() {
    return this.form.get('descrizione');
  }

  get personaRiferimento() {
    return this.form.get('personaRiferimento');
  }

  get cliente() {
    return this.form.get('cliente');
  }

  get colleghiSI() {
    return this.form.get('colleghiSI');
  }

  get note() {
    return this.form.get('note');
  }

  // funzione che setta e valorizza i campi dataInizio e dataFine con formato 'yyyy-mm-dd'
  setWeekDates() {
    let startOfWeek = new Date();
    let endOfWeek = new Date();
    let dayOfWeek = startOfWeek.getDay(); // es. 1 per lunedì

    // calcolo delle date di lunedì e venerdì della settimana in corso
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1);
    endOfWeek.setDate(endOfWeek.getDate() - dayOfWeek + 5);

    const monday = formatDateToUsDate(startOfWeek);
    const friday = formatDateToUsDate(endOfWeek);

    this.form.get('dataInizio')?.setValue(monday);
    this.form.get('dataFine')?.setValue(friday);
  }

  getUltimoResocontoByUser() {
    this.resocontoService.getUltimoResocontoByUser()
      .subscribe({
        next: (res) => {
          this.ultimoResoconto = res;

          // se c'è ultimoResoconto il form viene prevalorizzato con i suoi valori
          if (this.ultimoResoconto) {

            // limitazione della selezione di date nel datepicker in base all'ultimo resoconto inserito 
            const date = new Date(this.ultimoResoconto.dataFine);
            date.setDate(date.getDate() + 3);
            this.endDateLastResoconto = formatDateToUsDate(date);

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

            // se le date di ultimoResoconto corrispondono alle date dell'attuale settimana il form verrà disabilitato,
            // verrà rimosso il pulsante di submit e verrà cambiato il messaggio sopra il form
            if (
              dataInizio === this.ultimoResoconto.dataInizio &&
              dataFine === this.ultimoResoconto.dataFine
            ) {
              this.resocontoGiaInserito();
            }
          }
        },
        error: (err: HttpErrorResponse) => {
          // se l'errore è di tipo 404 e non ci sono ancora resoconti inseriti non serve mostrare la snackbar di errore
          if (err.status !== 404) {
            this.snackbarService.openSnackbar(err.error?.message || 'Errore del server');
          }
        }
      })
  }

  onSubmit() {
    if (this.form.valid) {
      const dataInizio = new Date(this.form.get('dataInizio')?.value);
      const dataFine = new Date(this.form.get('dataFine')?.value);

      const body: Partial<Resoconto> = {
        dataInizio: formatDateToUsDate(dataInizio),
        dataFine: formatDateToUsDate(dataFine),
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
    this.resocontoService.inserisciResoconto(body)
      .subscribe({
        next: () => {
          this.setWeekDates();
          this.getUltimoResocontoByUser();
          this.snackbarService.openSnackbar('Inserimento avvenuto con successo!');
        },
        error: (err) => {
          this.errorHandlerService.handleErrors(err);
        }
      });
  }

  private resocontoGiaInserito(): void {
    this.submitButtonVisibility.set(false);
    this.form.disable();
    this.message.set('Resoconto già inserito per la settimana corrente');
  }

}
