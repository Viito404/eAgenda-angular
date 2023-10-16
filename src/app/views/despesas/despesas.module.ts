import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { CardDespesaComponent } from './card-despesa/card-despesa.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { DespesasRoutingModule } from './despesas-routing.module';
import { DespesasService } from './services/despesas.service';
import { CategoriasService } from '../categorias/services/categorias.service';

@NgModule({
  declarations: [
    InserirDespesaComponent,
    EditarDespesaComponent,
    ExcluirDespesaComponent,
    ListarDespesasComponent,
    CardDespesaComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule,NgSelectModule, DespesasRoutingModule
  ],
  providers: [DespesasService, CategoriasService]
})
export class DespesasModule { }
