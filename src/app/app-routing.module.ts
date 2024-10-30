import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarClienteComponent } from './components/registrar-cliente/registrar-cliente.component'; 
import { ConsultarClientesComponent } from './components/consultar-clientes/consultar-clientes.component'; 

const routes: Routes = [
  { path: 'registrar', component: RegistrarClienteComponent },
  { path: 'consultar', component: ConsultarClientesComponent },
  { path: '', redirectTo: '/consultar', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/consultar' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
