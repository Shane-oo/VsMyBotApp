import { TestBed } from '@angular/core/testing';

import { TheGameServiceService } from './the-game-service.service';

describe('TheGameServiceService', () => {
  let service: TheGameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheGameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
