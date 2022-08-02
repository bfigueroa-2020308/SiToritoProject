import { TestBed } from '@angular/core/testing';

import { ProductoRestService } from './producto-rest.service';

describe('ProductoRestService', () => {
  let service: ProductoRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
