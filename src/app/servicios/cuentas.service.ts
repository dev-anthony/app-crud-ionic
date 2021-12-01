import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cuenta } from '../modelos/Cuenta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  url = 'https://apibancosj.salinacruz.tecnm.mx/public/api/cuenta';
  header = new HttpHeaders().set('Content-Type', 'application/json');

  constructor( private http: HttpClient ) { }

  getCuentas() {
    //Cuando se trae un arreglo se trae todo, y cuando no se usa un arreglo, se trae solo un dato
    return this.http.get<any[]>(this.url);
  }

  getCuenta(id: number): Observable<Cuenta> {
    return this.http.get<Cuenta>(`${this.url}/show/${id}`);
  }

  deleteCuenta(id: number) {
    return this.http.delete<any[]>(`${this.url}/delete/${id}`, {headers: this.header});
  }

  postCuenta(cuenta: Cuenta) {
    //Necesita introducir todo lo que venga de cuenta
    return this.http.post<any>(`${this.url}/create`, cuenta, {headers: this.header});
  }

  putCuenta(cuenta: Cuenta): Observable<Cuenta> {
    return this.http.put<Cuenta>(`${this.url}/update/${cuenta.id}`, cuenta, {headers: this.header});
  }
    
}

