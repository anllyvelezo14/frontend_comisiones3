import { TestBed } from '@angular/core/testing';

import { SearchUsuariosService } from './search-usuarios.service';

describe('SearchUsuariosService', () => {
  let service: SearchUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
