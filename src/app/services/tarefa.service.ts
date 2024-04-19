import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  dataVencimento: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private tarefas: Tarefa[] = [];
  private tarefasSubject: BehaviorSubject<Tarefa[]> = new BehaviorSubject<Tarefa[]>([]);

  constructor() { }

  adicionarTarefa(tarefa: Tarefa): void {
    this.tarefas.push(tarefa);
    this.tarefasSubject.next([...this.tarefas]);
  }

  listarTarefas(): Observable<Tarefa[]> {
    return this.tarefasSubject.asObservable();
  }

  removerTarefa(id: number): void {
    this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
    this.tarefasSubject.next([...this.tarefas]);
  }
}
