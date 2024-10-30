import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegistrarClienteComponent } from '../registrar-cliente/registrar-cliente.component';


interface Cliente {
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
  direccion: string;
}

@Component({
  selector: 'app-consultar-clientes',
  templateUrl: './consultar-clientes.component.html',
  styleUrls: ['./consultar-clientes.component.scss'] 
})
export class ConsultarClientesComponent {

  searchForm: FormGroup;
  allClientes: Cliente[] = []; 
  clientes: Cliente[] = [];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: [''] 
    });
  }

  ngOnInit() {
    
    this.allClientes = [
  { nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@gmail.com', celular: '1234567890', direccion: 'Calle Falsa 123' },
  { nombre: 'María', apellido: 'Gómez', email: 'maria.gomez@gmail.com', celular: '0987654321', direccion: 'Avenida Siempre Viva 742' },
  { nombre: 'Carlos', apellido: 'López', email: 'carlos.lopez@gmail.com', celular: '4567891230', direccion: 'Avenida Libertad 456' },
  { nombre: 'Ana', apellido: 'Martínez', email: 'ana.martinez@gmail.com', celular: '1122334455', direccion: 'Calle 8 N° 15' },
  { nombre: 'Luis', apellido: 'Ramírez', email: 'luis.ramirez@gmail.com', celular: '2233445566', direccion: 'Paseo de las Rosas 98' },
  { nombre: 'Carmen', apellido: 'Sánchez', email: 'carmen.sanchez@gmail.com', celular: '3344556677', direccion: 'Avenida Los Pinos 122' },
  { nombre: 'Ricardo', apellido: 'Fernández', email: 'ricardo.fernandez@gmail.com', celular: '4455667788', direccion: 'Boulevard Central 67' },
  { nombre: 'Isabel', apellido: 'Morales', email: 'isabel.morales@gmail.com', celular: '5566778899', direccion: 'Calle Luna 24' },
  { nombre: 'Diego', apellido: 'Ortega', email: 'diego.ortega@gmail.com', celular: '6677889900', direccion: 'Avenida del Sol 123' },
  { nombre: 'Sofía', apellido: 'Ríos', email: 'sofia.rios@gmail.com', celular: '7788990011', direccion: 'Paseo del Parque 45' },
  
    ];
    this.clientes = [...this.allClientes]; 
  }

  onSearch() {
    const searchTerm = this.searchForm.value.searchTerm.toLowerCase(); 

    this.clientes = this.allClientes.filter(cliente => {
      const nombreCoincide = cliente.nombre.toLowerCase().includes(searchTerm);
      const apellidoCoincide = cliente.apellido.toLowerCase().includes(searchTerm);
      const emailCoincide = cliente.email.toLowerCase().includes(searchTerm);
      const celularCoincide = cliente.celular.includes(searchTerm); 

      return nombreCoincide || apellidoCoincide || emailCoincide || celularCoincide; 
    });

    this.searchForm.reset(); 
  }

  onClear() {
    this.searchForm.reset(); 
    this.clientes = [...this.allClientes]; 
  }
  

  onClienteRegistrado(nuevoCliente: Cliente) {
    const clienteExistente = this.allClientes.find(cliente => cliente.email === nuevoCliente.email);
    
    if (clienteExistente) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Ya existe un cliente con ese email.',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.allClientes.push(nuevoCliente); 
      this.clientes.push(nuevoCliente); 
      
      Swal.fire({
        icon: 'success',
        title: 'Cliente creado!',
        text: 'El cliente ha sido registrado correctamente.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  

}
