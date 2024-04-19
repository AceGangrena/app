import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarefaService, Tarefa } from '../../services/tarefa.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  tarefas$: Observable<Tarefa[]>;
  tarefaForm: FormGroup;
  mensagem: string = '';

  constructor(private formBuilder: FormBuilder, private tarefaService: TarefaService) {
    this.tarefas$ = this.tarefaService.listarTarefas();
    this.tarefaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataVencimento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  adicionarTarefa(): void {
    if (this.tarefaForm.valid) {
      const novaTarefa: Tarefa = {
        id: Date.now(),
        titulo: this.tarefaForm.value.titulo,
        descricao: this.tarefaForm.value.descricao,
        dataVencimento: new Date(this.tarefaForm.value.dataVencimento)
      };
      this.tarefaService.adicionarTarefa(novaTarefa);
      this.mensagem = 'Tarefa adicionada com sucesso!';
    } else {
      this.mensagem = 'Por favor, preencha todos os campos corretamente.';
    }
    setTimeout(() => this.mensagem = '', 3000);
    this.tarefaForm.reset();
  }

  removerTarefa(id: number): void {
    this.tarefaService.removerTarefa(id);
    this.mensagem = 'Tarefa removida com sucesso!';
    setTimeout(() => this.mensagem = '', 3000);
  }
}
