import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { Cliente } from '../../modelos/Cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {

  clientes: Cliente[] = [];
  textoBuscar: string = '';
  titulo: string = 'Clientes';

  constructor( private clientesService: ClientesService,
                private alertController: AlertController,
                private navController: NavController) { }

  ionViewWillEnter() {
    this.clientes=null;
    this.clientesService.getClientes().subscribe(
      (response: Cliente[]) => {
      // console.log(response);
      this.clientes = response;
      console.log(this.clientes);
    }
    );
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
  }

  verCliente(cliente: Cliente) {
    this.navController.navigateForward(['/clientes/cuentas/', cliente.id]);
  }

  agregarClientes() {
    this.navController.navigateForward(['/clientes/gestion/', -1]);
  }

  editarCliente(cliente: Cliente) {
    //Navega a la siguiente página mediante un arreglo
    this.navController.navigateForward(['/clientes/gestion/', cliente.id]);
  }

  async eliminarCliente(cliente, i) {
    const nombre = `${cliente.nombre} ${cliente.apellido}`;
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Cuidado!',
        message: `¿Deseas eliminar al cliente? <br><strong>${nombre}</strong>`,
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
              console.log('Confirm Okay');
              this.clientesService.deleteCliente(cliente.id).subscribe(
                (response: any) => {
                  console.log(response);
                  //Que borre el elemento del arreglo, y lo hará a partir del elemento i
                  this.clientes.splice(i,1);
                },
                (error) => {
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
