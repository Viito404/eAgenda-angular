import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefasRoutingModule } from './tarefas-routing.module';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import 'src/app/extensions/form-group.extension';
import { TarefasService } from './services/tarefas.service';
import { CardTarefaComponent } from './card-tarefa/card-tarefa.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';

@NgModule({
  declarations: [
    InserirTarefaComponent,
    ListarTarefasComponent,
    CardTarefaComponent,
    EditarTarefaComponent,
    ExcluirTarefaComponent
  ],
  imports: [
    CommonModule,
    TarefasRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
  ],
  providers: [TarefasService]
})
export class TarefasModule { }
