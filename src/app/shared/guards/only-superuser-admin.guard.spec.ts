import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onlySuperuserAdminGuard } from './only-superuser-admin.guard';

describe('onlySuperuserAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onlySuperuserAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
