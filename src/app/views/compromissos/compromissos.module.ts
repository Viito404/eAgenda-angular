import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CompromissosService } from './services/compromissos.service';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { CardCompromissoComponent } from './card-compromisso/card-compromisso.component';
import 'src/app/extensions/form-group.extension';
import { ContatosService } from '../contatos/services/contatos.service';
import { CompromissosRoutingModule } from './compromissos-routing.module';

@NgModule({
  declarations: [
    ListarCompromissosComponent,
    InserirCompromissoComponent,
    ExcluirCompromissoComponent,
    EditarCompromissoComponent,
    CardCompromissoComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, CompromissosRoutingModule],
  providers: [CompromissosService, ContatosService]
})
export class CompromissosModule { }
