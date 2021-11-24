import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentasPageRoutingModule } from './cuentas-routing.module';

import { CuentasPage } from './cuentas.page';
import { ComponenteModule } from 'src/app/componentes/componente/componente.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentasPageRoutingModule,
    ComponenteModule
  ],
  declarations: [CuentasPage]
})
export class CuentasPageModule {}
