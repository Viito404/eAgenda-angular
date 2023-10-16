import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemTarefaViewModel } from '../models/item-tarefa.view-model';
import { StatusItemEnum } from '../models/status-item.enum';
import { ToastrService } from 'ngx-toastr';
import { TarefasService } from '../services/tarefas.service';
import { Router } from '@angular/router';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';

@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html',
  styleUrls: ['./inserir-tarefa.component.css']
})
export class InserirTarefaComponent implements OnInit{
formTarefa?: FormGroup;
controlItem?: FormControl;

constructor(
  private formBuilder: FormBuilder, 
  private toastService: ToastrService,
  private tarefasService: TarefasService,
  private router: Router){}

get itens(){
  return this.formTarefa?.get('itens') as FormArray
}

  ngOnInit(): void {
    this.formTarefa = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: [0, [Validators.required]],

      itens: new FormArray([]),
    });

    this.controlItem = this.formBuilder.control('');
  }

  campoEstaInvalido(nome: string) {
    return this.formTarefa!.get(nome)!.touched && this.formTarefa!.get(nome)!.invalid;
  }

  adicionarItem(): void{
    const item: ItemTarefaViewModel = {
      titulo: this.controlItem?.value,
      status: StatusItemEnum.Adicionado,
      concluido: false
    }

    const itemGroup = this.formBuilder.group({
      titulo: [item.titulo],
      status: [item.status],
      concluido: [item.concluido]
    });

    this.itens.push(itemGroup);

    this.controlItem?.reset();
  }

  removerItem(index: number): void{
    this.itens.removeAt(index);
  }

  gravar(): void{
    if(this.formTarefa?.invalid){
      const erros = this.formTarefa.validate();

      for(let erro of erros) this.toastService.warning(erro);

      return;
    }

    this.tarefasService.inserir(this.formTarefa?.value).subscribe({
      next: (tarefas: FormsTarefaViewModel) => this.processarSucesso(tarefas),
      error: (erro: Error) => this.processarFalha(erro)  
    });

    }

    processarSucesso(tarefas: FormsTarefaViewModel){
      this.toastService.success(`Tarefa criada com sucesso!`, 'Sucesso');
    
      this.router.navigate(['/tarefas/listar']);
    }
    
    processarFalha(erro: Error){
      this.toastService.error(erro.message, 'Erro');
    }
  }

