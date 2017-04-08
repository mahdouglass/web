/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuoteServiceService } from './quote-service.service';

describe('QuoteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteServiceService]
    });
  });

  it('should ...', inject([QuoteServiceService], (service: QuoteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
