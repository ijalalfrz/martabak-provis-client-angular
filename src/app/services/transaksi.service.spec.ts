import { TestBed, inject } from '@angular/core/testing';

import { TransaksiService } from './transaksi.service';

describe('TransaksiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransaksiService]
    });
  });

  it('should be created', inject([TransaksiService], (service: TransaksiService) => {
    expect(service).toBeTruthy();
  }));
});
