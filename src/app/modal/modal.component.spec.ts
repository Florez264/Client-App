import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'; 
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería abrir el modal cuando se llama al método open()', () => {
    component.open();
    expect(component.isOpen).toBeTrue();
  });

  it('debería cerrar el modal cuando se llama al método close()', () => {
    component.open();
    component.close();
    expect(component.isOpen).toBeFalse();
  });

  it('debería mostrar el contenido del modal cuando isOpen es true', () => {
    component.open();
    fixture.detectChanges(); // Actualizar el DOM

    const modalContent = fixture.debugElement.query(By.css('.z-10'));
    expect(modalContent).toBeTruthy(); // Verifica que el contenido esté en el DOM
  });

  it('no debería mostrar el contenido del modal cuando isOpen es false', () => {
    component.close();
    fixture.detectChanges(); // Actualizar el DOM

    const modalContent = fixture.debugElement.query(By.css('.z-10'));
    expect(modalContent).toBeFalsy(); // Verifica que el contenido no esté en el DOM
  });

  it('debería cerrar el modal al hacer clic en el fondo oscuro', () => {
    component.open();
    fixture.detectChanges();

    const overlay = fixture.debugElement.query(By.css('.bg-black'));
    overlay.triggerEventHandler('click', null); // Simula el clic
    fixture.detectChanges();

    expect(component.isOpen).toBeFalse(); // Verifica que se haya cerrado
  });
});
