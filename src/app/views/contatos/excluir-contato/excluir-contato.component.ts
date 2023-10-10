import { Component, OnInit } from '@angular/core';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ContatosService } from '../services/contatos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styleUrls: ['./excluir-contato.component.css'],
})
export class ExcluirContatoComponent implements OnInit {
  contatoVM: VisualizarContatoViewModel;

  constructor(
    private contatoService: ContatosService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.contatoVM = new VisualizarContatoViewModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.contatoVM = this.route.snapshot.data['contato'];
  }

  gravar() {

    const idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!idSelecionado) return;

    this.contatoService.excluir(idSelecionado!).subscribe({
    next: (contato: FormsContatoViewModel) => this.processarSucesso(contato),
    error: (erro: Error) => this.processarFalha(erro)  
    });
  }

  processarSucesso(contato: FormsContatoViewModel) {
    this.toastService.success(
      `Contato excluído com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Erro');
  }
}
