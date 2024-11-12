import { TestBed } from '@angular/core/testing';

import { TarkovDevService } from './tarkov-dev.service';

describe('TarkovDevService', () => {
  let service: TarkovDevService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarkovDevService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
