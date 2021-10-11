import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensajeEliminarComponent } from './modal-mensaje-eliminar.component';

describe('ModalMensajeEliminarComponent', () => {
  let component: ModalMensajeEliminarComponent;
  let fixture: ComponentFixture<ModalMensajeEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMensajeEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMensajeEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
