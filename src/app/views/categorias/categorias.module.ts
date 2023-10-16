import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { CardCategoriaComponent } from './card-categoria/card-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriasService } from './services/categorias.service';
import { CategoriasRoutingModule } from './categoria-routing.module';
import 'src/app/extensions/form-group.extension';

@NgModule({
  declarations: [
    InserirCategoriaComponent,
    EditarCategoriaComponent,
    ExcluirCategoriaComponent,
    ListarCategoriasComponent,
    CardCategoriaComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, CategoriasRoutingModule
  ],
  providers: [CategoriasService]
})
export class CategoriasModule { }
