import { TestBed } from '@angular/core/testing';

import { ResocontoService } from './resoconto.service';

describe('ResocontoService', () => {
  let service: ResocontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResocontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
