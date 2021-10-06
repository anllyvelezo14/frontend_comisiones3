import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerEstadosComisionComponent } from './ver-estados-comision.component';

describe('VerEstadosComisionComponent', () => {
  let component: VerEstadosComisionComponent;
  let fixture: ComponentFixture<VerEstadosComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerEstadosComisionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEstadosComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
