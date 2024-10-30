import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const clientes = [
      { 
        id: 1, identificacion: '12345', 
        nombre: 'Juan', 
        apellido: 'Pérez', 
        email: 'juan.perez@example.com', 
        celular: '1234567890', 
        direccion: 'Calle Falsa 123' 
      },

    ];
    return { clientes };
  }
}
