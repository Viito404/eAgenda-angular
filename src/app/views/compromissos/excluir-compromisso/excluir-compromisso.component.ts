import { Component, OnInit } from '@angular/core';
import { CompromissosService } from '../services/compromissos.service';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styleUrls: ['./excluir-compromisso.component.css']
})
export class ExcluirCompromissoComponent implements OnInit{
  compromissoVM!: VisualizarCompromissoViewModel;

  constructor(
    private compromissosService: CompromissosService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.compromissoVM = this.route.snapshot.data['compromisso'];
  }

  gravar() {

    const idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!idSelecionado) return;

    this.compromissosService.excluir(idSelecionado!).subscribe({
    next: (contato: FormsCompromissoViewModel) => this.processarSucesso(contato),
    error: (erro: Error) => this.processarFalha(erro)  
    });
  }

  processarSucesso(contato: FormsCompromissoViewModel) {
    this.toastService.success(
      `Compromisso excluído com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Erro');
  }
}
