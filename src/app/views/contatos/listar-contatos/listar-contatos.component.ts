import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../services/contatos.service';
import { ListarContatoViewModel } from '../models/listar-contatos.view-model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css'],
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[] = [];

  constructor(private toastService: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.data.pipe(map((dados) => dados['contatos'])).subscribe({
      next: (contatos) => this.processarSucesso(contatos),
      error: (erro) => this.processarFalha(erro)
    });
  }
  
  processarFalha(erro: Error){
    this.toastService.error(erro.message, 'Erro');
  }

  processarSucesso(contatos: ListarContatoViewModel[]){
    this.contatos = contatos;
  }
}

