import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefasService } from '../services/tarefas.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemTarefaViewModel } from '../models/item-tarefa.view-model';
import { StatusItemEnum } from '../models/status-item.enum';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit{

formTarefa?: FormGroup;
controlItem?: FormControl;

  constructor(
    private formBuilder: FormBuilder, 
    private toastService: ToastrService,
    private tarefasService: TarefasService,
    private route: ActivatedRoute,
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
    const tarefa = this.route.snapshot.data['tarefa'];

    this.formTarefa.patchValue(tarefa);

    for(let itemCadastrado of tarefa.itens){
      const novoItemGroup = this.formBuilder.group({
        id: [itemCadastrado.id],
        titulo: [itemCadastrado.titulo],
        status: [itemCadastrado.status],
        concluido: [itemCadastrado.concluido],
      })
      this.itens.push(novoItemGroup);
    }
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
    const grupo = this.itens.controls.at(index);

    const valorAtual = grupo?.get('status')?.value as StatusItemEnum;

    const valorAlternado = valorAtual == StatusItemEnum.Removido ? StatusItemEnum.Inalterado : StatusItemEnum.Removido;
    grupo?.patchValue({status: valorAlternado })
  }
    concluirItem(index: number): void{
    const grupo = this.itens.controls.at(index);

    const valorAtual = grupo?.get('concluido')?.value as boolean;

    const valorAlternado = !valorAtual;
    grupo?.patchValue({concluido: valorAlternado })
  }
  gravar(): void{
    if(this.formTarefa?.invalid){
      const erros = this.formTarefa.validate();

      for(let erro of erros) this.toastService.warning(erro);

      return;
    }

    const id = this.route.snapshot.paramMap.get('id')!;

    this.tarefasService.editar(id, this.formTarefa?.value).subscribe({
      next: (tarefas: FormsTarefaViewModel) => this.processarSucesso(tarefas),
      error: (erro: Error) => this.processarFalha(erro)  
    });

    }

    processarSucesso(tarefas: FormsTarefaViewModel){
      this.toastService.success(`Tarefa editada com sucesso!`, 'Sucesso');
    
      this.router.navigate(['/tarefas/listar']);
    }
    
    processarFalha(erro: Error){
      this.toastService.error(erro.message, 'Erro');
    }
}
