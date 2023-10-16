import { Component, Input } from '@angular/core';
import { ListarTarefasViewModel } from '../models/listar-tarefas.view-model';

@Component({
  selector: 'app-card-tarefa',
  templateUrl: './card-tarefa.component.html',
  styleUrls: ['./card-tarefa.component.css']
})
export class CardTarefaComponent {
  @Input({ required: true }) tarefa!: ListarTarefasViewModel;
}
