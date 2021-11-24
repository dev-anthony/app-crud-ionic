import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/modelos/Cliente';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {

  id: any;
  titulo: string = '';
  cliente: Cliente = new Cliente();

  constructor(private route: ActivatedRoute,
    private clientesService: ClientesService,
    private alert: AlertController,
    private r: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id == -1){
      this.titulo = 'Nuevo Cliente';
    }else{
      this.titulo = 'Editar Cliente';
      this.clientesService.showCliente(this.id).subscribe(response => {
        this.cliente = response['data'];
        console.log('Cliente', this.cliente);
      }
      );
    }
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

  guardar(){
    //Petición es del tipo observable por eso no lleva subscribe
    let peticion: Observable<any>;
    if(this.cliente.id){
      peticion = this.clientesService.updateCliente(this.cliente);
    }else{
      peticion = this.clientesService.postCliente(this.cliente);
    }
    peticion.subscribe(() => {
      if(this.cliente.id){
        this.alerta('Editar', this.cliente.nombre, 'Se ha editado el cliente correctamente');
      }else{
        this.alerta('Nuevo', this.cliente.nombre, 'Se ha creado el cliente correctamente');
      }
      //Para que te regrese a la página que tu quieras
      this.r.navigate(['/clientes']);
    });
  }
}
