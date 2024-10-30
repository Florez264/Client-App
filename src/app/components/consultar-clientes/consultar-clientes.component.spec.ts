import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ConsultarClientesComponent } from './consultar-clientes.component';
import { RegistrarClienteComponent } from '../registrar-cliente/registrar-cliente.component';
import { ModalComponent } from '../../modal/modal.component'; 
import { TableModule } from 'primeng/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swal from 'sweetalert2';

describe('ConsultarClientesComponent', () => {
  let component: ConsultarClientesComponent;
  let fixture: ComponentFixture<ConsultarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ConsultarClientesComponent,
        RegistrarClienteComponent, 
        ModalComponent 
      ],
      imports: [ReactiveFormsModule, TableModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar los clientes correctamente', () => {
    expect(component.allClientes.length).toBeGreaterThan(0);
  });

  it('debería filtrar clientes correctamente al buscar', () => {
    component.searchForm.controls['searchTerm'].setValue('Juan');
    component.onSearch();
    expect(component.clientes.length).toBeLessThanOrEqual(component.allClientes.length);
  });

  it('debería limpiar los resultados de la búsqueda', () => {
    component.onClear();
    expect(component.clientes.length).toEqual(component.allClientes.length);
  });

  it('debería mostrar error si el cliente ya existe al registrar', () => {
    const nuevoCliente = { nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@gmail.com', celular: '1234567890', direccion: 'Calle Falsa 123' };
    
    spyOn(Swal, 'fire');
    component.onClienteRegistrado(nuevoCliente);
    
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      icon: 'error',
      title: 'Error!',
      text: 'Ya existe un cliente con ese email.',
      confirmButtonText: 'Aceptar'
    }));
  });

  it('debería agregar un nuevo cliente correctamente y mostrar mensaje de éxito', () => {
    const nuevoCliente = { nombre: 'Ana', apellido: 'Ramírez', email: 'ana.ramirez@gmail.com', celular: '1122334455', direccion: 'Calle Real 123' };
  
    spyOn(Swal, 'fire');
    const initialLength = component.allClientes.length;
  
    component.onClienteRegistrado(nuevoCliente);
  
    expect(component.allClientes.length).toBe(initialLength + 1);
    expect(component.allClientes[initialLength]).toEqual(nuevoCliente);
  
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      icon: 'success',
      title: 'Cliente creado!',
      text: 'El cliente ha sido registrado correctamente.',
      confirmButtonText: 'Aceptar'
    }));
  });
  
    

  it('debería crear el formulario de búsqueda', () => {
    const form = component.searchForm; 
    expect(form).toBeTruthy(); 
    expect(form.controls['searchTerm']).toBeTruthy(); 
  });

  it('debería realizar la búsqueda correctamente', () => {
    const allClientes = [
      { nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@gmail.com', celular: '1234567890', direccion: 'Calle Falsa 123' },
      { nombre: 'María', apellido: 'Gómez', email: 'maria.gomez@gmail.com', celular: '0987654321', direccion: 'Avenida Siempre Viva 742' },
      { nombre: 'Carlos', apellido: 'López', email: 'carlos.lopez@gmail.com', celular: '4567891230', direccion: 'Avenida Libertad 456' },
    ];

    component.allClientes = allClientes; 
    component.searchForm.setValue({ searchTerm: 'Juan' }); 
    component.onSearch(); 

    expect(component.clientes.length).toBe(1); 
    expect(component.clientes[0].nombre).toBe('Juan'); 
  });
});
