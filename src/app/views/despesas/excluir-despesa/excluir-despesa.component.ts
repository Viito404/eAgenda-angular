import { Component, OnInit } from '@angular/core';
import { FormsDespesaViewModel } from '../models/forms-despesa.view-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesasService } from '../services/despesas.service';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa.view-model';

@Component({
  selector: 'app-excluir-despesa',
  templateUrl: './excluir-despesa.component.html',
  styleUrls: ['./excluir-despesa.component.css']
})
export class ExcluirDespesaComponent implements OnInit{
  despesaVM!: VisualizarDespesaViewModel;

  constructor(
    private despesasService: DespesasService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.despesaVM = this.route.snapshot.data['despesa'];
  }

  gravar() {

    const idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!idSelecionado) return;

    this.despesasService.excluir(idSelecionado!).subscribe({
    next: (contato: FormsDespesaViewModel) => this.processarSucesso(contato),
    error: (erro: Error) => this.processarFalha(erro)  
    });
  }

  processarSucesso(contato: FormsDespesaViewModel) {
    this.toastService.success(
      `Despesa excluída com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/despesas/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Erro');
  }
}
