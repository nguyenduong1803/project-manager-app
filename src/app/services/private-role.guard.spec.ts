import { TestBed } from '@angular/core/testing';

import { PrivateRoleGuard } from './private-role.guard';

describe('PrivateRoleGuard', () => {
  let guard: PrivateRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrivateRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
