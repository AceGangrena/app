import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'] 
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  clientForm: FormGroup; // Não é necessário inicializar aqui

  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
    this.listar();
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  inserir(): void {
    if (this.clientForm.valid) {
      const clientNovo: Cliente = {
        nome: this.clientForm.value.nome,
        telefone: this.clientForm.value.telefone,
        id: this.generateRandomString(6)
      };
      this.clientForm.reset();
      this.clienteService.adicionar(clientNovo);
      alert('Cadastrado com sucesso!');
      this.listar(); // Atualiza a lista após inserção
    }
  }

  listar(): void {
    this.clientes = this.clienteService.listar();
  }

  remover(id: string): void {
    this.clienteService.remover(id);
    alert('Removido com sucesso!');
    this.listar(); // Atualiza a lista após remoção
  }
}
