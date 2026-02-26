import { TestBed } from '@angular/core/testing';

import { ProductsData } from './products-data';

describe('ProductsData', () => {
  let service: ProductsData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
