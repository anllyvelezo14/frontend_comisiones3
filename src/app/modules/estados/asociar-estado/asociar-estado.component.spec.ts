import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarEstadoComponent } from './asociar-estado.component';

describe('AsociarEstadoComponent', () => {
  let component: AsociarEstadoComponent;
  let fixture: ComponentFixture<AsociarEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociarEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
