import { TestBed } from '@angular/core/testing';

import { TheGameService } from './the-game.service';

describe('TheGameService', () => {
  let service: TheGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
