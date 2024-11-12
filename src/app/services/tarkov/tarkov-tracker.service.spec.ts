import { TestBed } from '@angular/core/testing';

import { TarkovTrackerService } from './tarkov-tracker.service';

describe('TarkovTrackerService', () => {
  let service: TarkovTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarkovTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
