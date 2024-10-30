import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; 
import { RegistrarClienteComponent } from './registrar-cliente.component';

describe('RegistrarClienteComponent', () => {
  let component: RegistrarClienteComponent;
  let fixture: ComponentFixture<RegistrarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarClienteComponent],
      imports: [ReactiveFormsModule] 
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería crear el formulario de cliente', () => {
    const form = component.clienteForm; 
    expect(form).toBeTruthy(); 
    expect(form.controls['nombre']).toBeTruthy(); 
    expect(form.controls['email']).toBeTruthy(); 
  });
});
