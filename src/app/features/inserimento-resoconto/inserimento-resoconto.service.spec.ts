import { TestBed } from '@angular/core/testing';

import { InserimentoResocontoService } from './inserimento-resoconto.service';

describe('InserimentoResocontoService', () => {
  let service: InserimentoResocontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InserimentoResocontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
