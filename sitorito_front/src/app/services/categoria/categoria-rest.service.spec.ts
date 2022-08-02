import { TestBed } from '@angular/core/testing';

import { CategoriaRestService } from './categoria-rest.service';

describe('CategoriaRestService', () => {
  let service: CategoriaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
