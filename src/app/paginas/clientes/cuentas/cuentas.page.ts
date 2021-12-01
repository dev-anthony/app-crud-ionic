import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { Cliente } from '../../../modelos/Cliente';
import { CuentasCliente } from '../../../interfaces/cuentasCliente';
import { AlertController } from '@ionic/angular';
import { Cuenta } from 'src/app/modelos/Cuenta';
import { CuentasService } from 'src/app/servicios/cuentas.service';



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
  cuentaCliente = new Cuenta();

  constructor( private route: ActivatedRoute,
                private clientesService: ClientesService,
                private alert: AlertController,
                private cuentasServices: CuentasService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    // this.clientesService.showCliente(this.id).subscribe(data => {
    //   this.cliente = data['data'];
    //   console.log(this.cliente);
    //   //trater la data con el nombre y apellido
    //   this.nombre = `${this.cliente.nombre} ${this.cliente.apellido}`;
    //   console.log(this.nombre);
    // });

    this.refresh();
  
  }

  refresh(){
    this.clientesService.clienteCuenta(this.id).subscribe(
      response => {
        this.cuentasCliente = response;
        // console.log(response);
        if (this.cuentasCliente.length === 0) {
          this.mensaje = 'No tiene cuentas registradas';
        }
      });
  }

  async alerta(titulo: string, subtitulo: string, mensaje: string){
    const alert = await this.alert.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async agregarCuenta() {
    let cuentaAgregar = new Cuenta();
    cuentaAgregar.fondo = '0';
    cuentaAgregar.cliente_id = this.id;
    const titulo = 'Agregar Cuenta';
      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: titulo,
        inputs: [
          {
            name: 'Moneda',
            type: 'text',
            value: cuentaAgregar.moneda,
            placeholder: 'Moneda'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Confirmar',
            handler: (data) => {
              cuentaAgregar.moneda = data.Moneda;
              this.cuentasServices.postCuenta(cuentaAgregar).subscribe(
                response => {
                  console.log(response);
                  this.refresh();
                  this.alerta('Genial', 'Crear Cuenta', 'Cuenta agregada con exito');
                },
                error => {
                  console.log(cuentaAgregar);
                  this.alerta('Error', 'Crear Cuenta', 'Error al crear cuenta<br>' + error);
                }
              );
            }
          }
        ]
      });
  
      await alert.present();
    }

    async editarCuenta(cuenta, i) {
      const titulo = `Editar Cuenta ${cuenta.cuenta_id}`;
        const alert = await this.alert.create({
          cssClass: 'my-custom-class',
          header: titulo,
          inputs: [
            {
              name: 'Moneda',
              type: 'text',
              value: cuenta.moneda,
              placeholder: 'Moneda'
            }
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Confirmar',
              handler: (data) => {
                this.cuentasServices.getCuenta(cuenta.cuenta_id).subscribe(
                  response => {
                    this.cuentaCliente = response['data'];
                    console.log(this.cuentaCliente);
                    this.cuentaCliente.moneda = data.Moneda;
                    console.log(this.cuentaCliente);
                    // crea un callback para actualizar la cuenta con put de cuentasServices
                    this.cuentasServices.putCuenta(this.cuentaCliente).subscribe(
                      response => {
                        this.cuentasCliente[i].moneda = data.Moneda;
                        console.log(response);
                      }
                    );
                  }
                );
              }
            }
          ]
        });
    
        await alert.present();
      }
  

      async eliminarCuenta(cuenta, i) {
        const titulo = `¡Cuidado!`;
        const nombre = `${cuenta.nombre} ${cuenta.apellido}`;
          const alert = await this.alert.create({
            cssClass: 'my-custom-class',
            header: titulo,
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Confirmar',
                handler: () => {
                  this.cuentasServices.deleteCuenta(cuenta.cuenta_id).subscribe(
                    response => {
                      console.log(response);
                      //Que borre el indice i y que elimine un solo elemento
                      this.cuentasCliente.splice(i, 1);
                    },
                    error => {
                      console.log(error);
                    }
                  );
                }
              }
            ]
          });
      
          await alert.present();
        }
}
