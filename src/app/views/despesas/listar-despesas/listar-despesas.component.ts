import { Component, OnInit } from '@angular/core';
import { ListarDespesasViewModel } from '../models/listar-despesas.view-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent implements OnInit{

  despesas: ListarDespesasViewModel[] = [];

  constructor(private toastService: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.data.pipe(map((dados) => dados['despesas'])).subscribe({
      next: (despesas) => this.processarSucesso(despesas),
      error: (erro) => this.processarFalha(erro)
    });
  }
  processarFalha(erro: Error){
    this.toastService.error(erro.message, 'Erro');
  }

  processarSucesso(despesas: ListarDespesasViewModel[]){
    this.despesas = despesas;
  }
}
