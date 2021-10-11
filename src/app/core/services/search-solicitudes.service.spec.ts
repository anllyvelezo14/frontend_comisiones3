import { TestBed } from '@angular/core/testing';

import { SearchSolicitudesService } from './search-solicitudes.service';

describe('SearchSolicitudesService', () => {
  let service: SearchSolicitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchSolicitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
