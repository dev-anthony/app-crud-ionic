import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './clientes-routing.module';

import { ClientesPage } from './clientes.page';
import { ComponenteModule } from 'src/app/componentes/componente/componente.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    ComponenteModule,
    PipesModule
  ],
  declarations: [ClientesPage]
})
export class ClientesPageModule {}
