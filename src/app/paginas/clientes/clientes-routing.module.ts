import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesPage } from './clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage
  },
  {
    //La página de gestión necesita el parametro que se está pasando que es el id del cliente
    path: 'gestion/:id',
    loadChildren: () => import('./gestion/gestion.module').then( m => m.GestionPageModule)
  },
  {
    path: 'cuentas/:id',
    loadChildren: () => import('./cuentas/cuentas.module').then( m => m.CuentasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule {}
