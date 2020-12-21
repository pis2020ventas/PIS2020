import { TestBed } from '@angular/core/testing';

import { SaleslistService } from './saleslist.service';

describe('SaleslistService', () => {
  let service: SaleslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
