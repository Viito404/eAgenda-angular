import { Component, OnInit } from '@angular/core';
import { ListarCompromissosViewModel } from '../models/listar-compromissos.view-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit{

  compromissos: ListarCompromissosViewModel[] = [];

  constructor(private toastService: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.data.pipe(map((dados) => dados['compromissos'])).subscribe({
      next: (compromissos) => this.processarSucesso(compromissos),
      error: (erro) => this.processarFalha(erro)
    });
  }
  processarFalha(erro: Error){
    this.toastService.error(erro.message, 'Erro');
  }

  processarSucesso(compromissos: ListarCompromissosViewModel[]){
    this.compromissos = compromissos;
  }
}
