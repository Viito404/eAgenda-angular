import { Component } from '@angular/core';
import { ListarCategoriasViewModel } from '../models/listar-categorias.view-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent {
  categorias: ListarCategoriasViewModel[] = [];

  constructor(private toastService: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.data.pipe(map((dados) => dados['categorias'])).subscribe({
      next: (categorias) => this.processarSucesso(categorias),
      error: (erro) => this.processarFalha(erro)
    });
  }
  
  processarFalha(erro: Error){
    this.toastService.error(erro.message, 'Erro');
  }

  processarSucesso(categorias: ListarCategoriasViewModel[]){
    this.categorias = categorias;
  }
}
