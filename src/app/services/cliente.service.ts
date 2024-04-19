import { Injectable } from '@angular/core';
import {Cliente} from '../interfaces/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor() { }

  //Esta lista virá da API
  clientes:Cliente[] = [
    
  ];

  listar():Cliente[]{
    return this.clientes;
  }

  remover(id:string){
    const cliente = this.clientes.find(c => c.id == id);

    if(cliente){
       const index = this.clientes.indexOf(cliente);
       this.clientes.splice(index,1);
    }
  }

  adicionar(cliente:Cliente){
    this.clientes.push(cliente);
  }
}
