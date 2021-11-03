import { TestBed } from '@angular/core/testing';

import { EstadoSolicitudIntermediaService } from './estado-solicitud-intermedia.service';

describe('EstadoSolicitudIntermediaService', () => {
  let service: EstadoSolicitudIntermediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoSolicitudIntermediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
