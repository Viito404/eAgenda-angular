import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.css']
})
export class ExcluirCategoriaComponent implements OnInit{
  categoriaVM!: VisualizarCategoriaViewModel;

  constructor(
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoriaVM = this.route.snapshot.data['categoria'];
  }

  gravar() {

    const idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!idSelecionado) return;

    this.categoriasService.excluir(idSelecionado!).subscribe({
    next: (categoria: FormsCategoriaViewModel) => this.processarSucesso(),
    error: (erro: Error) => this.processarFalha(erro)  
    });
  }

  processarSucesso() {
    this.toastService.success(
      `Categoria excluída com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/categorias/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Erro');
  }
}
