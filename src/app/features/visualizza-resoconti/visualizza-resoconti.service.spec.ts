import { TestBed } from '@angular/core/testing';

import { VisualizzaResocontiService } from './visualizza-resoconti.service';

describe('VisualizzaResocontiService', () => {
  let service: VisualizzaResocontiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizzaResocontiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
