import { TestBed } from '@angular/core/testing';

import { MesaRestService } from './mesa-rest.service';

describe('MesaRestService', () => {
  let service: MesaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
