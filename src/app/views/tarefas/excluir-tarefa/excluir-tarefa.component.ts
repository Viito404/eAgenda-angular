import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';
import { VisualizarTarefaViewModel } from '../models/visualizar-tarefa.view-model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-excluir-tarefa',
  templateUrl: './excluir-tarefa.component.html',
  styleUrls: ['./excluir-tarefa.component.css']
})
export class ExcluirTarefaComponent implements OnInit{
  tarefaVM!: VisualizarTarefaViewModel;

  constructor(
    private tarefasService: TarefasService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.tarefaVM = this.route.snapshot.data['tarefa'];
  }

  gravar() {

    const idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!idSelecionado) return;

    this.tarefasService.excluir(idSelecionado!).subscribe({
    next: (tarefa: FormsTarefaViewModel) => this.processarSucesso(tarefa),
    error: (erro: Error) => this.processarFalha(erro)  
    });
  }

  processarSucesso(tarefa: FormsTarefaViewModel) {
    this.toastService.success(
      `Tarefa excluída com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/tarefas/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Erro');
  }
}
