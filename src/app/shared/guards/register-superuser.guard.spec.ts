import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { registerSuperuserGuard } from './register-superuser.guard';

describe('registerSuperuserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => registerSuperuserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
