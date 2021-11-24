import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { Cliente } from '../../../modelos/Cliente';
import { CuentasCliente } from '../../../interfaces/cuentasCliente';



@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.page.html',
  styleUrls: ['./cuentas.page.scss'],
})
export class CuentasPage implements OnInit {

  id: any;
  nombre: string = '';
  cliente = new Cliente();
  cuentasCliente: CuentasCliente[] = [];
  mensaje: string = '';

  constructor( private route: ActivatedRoute,
                private clientesService: ClientesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.clientesService.showCliente(this.id).subscribe(data => {
      this.cliente = data['data'];
      console.log(this.cliente);
      //trater la data con el nombre y apellido
      this.nombre = `${this.cliente.nombre} ${this.cliente.apellido}`;
      console.log(this.nombre);
    });

    this.clientesService.clienteCuenta(this.id).subscribe(
      response => {
        this.cuentasCliente = response;
        // console.log(response);
        if (this.cuentasCliente.length === 0) {
          this.mensaje = 'No tiene cuentas registradas';
        }
      });
  
  }

  agregarCuentas(){

  }

}
