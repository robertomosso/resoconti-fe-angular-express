import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith, tap } from 'rxjs';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Resoconto } from '../../shared/interfaces/resoconto.interface';
import { UserService } from '../../shared/services/user.service';
import { UserModel } from '../../shared/interfaces/user.interface';
import { ResocontoService } from '../../shared/services/resoconto.service';
import { DateFormatterPipe } from '../../shared/pipes/date-formatter.pipe';


@Component({
  selector: 'app-visualizza-resoconti',
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTableModule,
    AsyncPipe,
    DateFormatterPipe,
  ],
  templateUrl: './visualizza-resoconti.component.html',
  styleUrl: './visualizza-resoconti.component.css'
})
export class VisualizzaResocontiComponent implements OnInit {

  users = new FormControl('');
  // anno = new FormControl('');

  // listaAnni = ['2024', '2025'];
  listaUtenti: Partial<UserModel[]> = [];
  filteredListaUtenti: Observable<Partial<UserModel[]>> | undefined;

  displayedColumns = [
    'dataInizio',
    'dataFine',
    'tipoAttivita',
    'attivita',
    'descrizione',
    'personaRiferimento',
    'cliente',
    'colleghiSI',
    'note',
  ];

  dataSource: Resoconto[] = [];

  displayUserName(user: any): string {
    return user && user.name ? user.name : '';
  }

  constructor(
    private readonly usersService: UserService,
    private readonly resocontoService: ResocontoService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.listaUtenti = res.users;
        this.filteredListaUtenti = this.users.valueChanges.pipe(
          startWith(''),
          // tap(value => {
          //   this.anno.reset();
          //   value ? this.anno.enable() : this.anno.disable();
          // }),
          map(value => this._filter(value || '')),
        );
      },
      error: (err) => {
        this.errorHandlerService.handleErrors(err);
      }
    });
  }

  private _filter(value: string | Partial<UserModel>) {
    let filterValue: string | undefined = '';

    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else {
      filterValue = (value as Partial<UserModel>).name?.toLowerCase();
    }
    return this.listaUtenti.filter(option => option?.name.toLowerCase().includes(filterValue!));
  }

  loadResocontiUser(event: MatAutocompleteSelectedEvent) {
    const userId = event.option.value?.id;

    this.resocontoService.getResocontiUtente(userId).subscribe({
      next: (res) => {
        this.dataSource = res.resoconti;
      },
      error: (err) => {
        this.errorHandlerService.handleErrors(err);
      }
    })
  }

}
