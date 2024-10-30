import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.scss']
})
export class RegistrarClienteComponent {

  @Output() clienteRegistrado = new EventEmitter<any>(); 

  clienteForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      const nuevoCliente = this.clienteForm.value;
      console.log(nuevoCliente);
      this.clienteRegistrado.emit(nuevoCliente); 
      this.clienteForm.reset(); 
    }
  }
}
