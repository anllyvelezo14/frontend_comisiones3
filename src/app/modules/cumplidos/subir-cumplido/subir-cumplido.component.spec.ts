import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirCumplidoComponent } from './subir-cumplido.component';

describe('SubirCumplidoComponent', () => {
  let component: SubirCumplidoComponent;
  let fixture: ComponentFixture<SubirCumplidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirCumplidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirCumplidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
