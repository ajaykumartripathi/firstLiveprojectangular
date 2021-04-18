import { TestBed } from '@angular/core/testing';

import { ExternalGuard } from './external.guard';

describe('ExternalGuard', () => {
  let guard: ExternalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExternalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
