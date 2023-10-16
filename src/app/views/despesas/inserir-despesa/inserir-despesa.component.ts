import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsDespesaViewModel } from '../models/forms-despesa.view-model';
import { ListarCategoriasViewModel } from '../../categorias/models/listar-categorias.view-model';
import { DespesasService } from '../services/despesas.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../../categorias/services/categorias.service';

@Component({
  selector: 'app-inserir-despesa',
  templateUrl: './inserir-despesa.component.html',
  styleUrls: ['./inserir-despesa.component.css']
})
export class InserirDespesaComponent implements OnInit{
  form?: FormGroup;
  categorias: ListarCategoriasViewModel[] = [];
  despesaVM!: FormsDespesaViewModel;


  constructor(
    private formBuilder: FormBuilder,
    private despesasService: DespesasService,
    private router: Router,
    private toastService: ToastrService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
    descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
    valor: new FormControl(0, [Validators.required, Validators.min(0.1)]),
    data: new FormControl(new Date().toString().substring(0, 10),
     [Validators.required]),
    tipoPagamento: new FormControl(0, Validators.required),
    categoriasSelecionadas: new FormControl([], Validators.required)
  });

  this.categoriasService.selecionarTodos().subscribe((categorias) => this.categorias = categorias);
}

campoEstaInvalido(nome: string) {
  return this.form!.get(nome)!.touched && this.form!.get(nome)!.invalid;
}
gravar() {
  if (this.form?.invalid) {
    
    for(let erro of this.form.validate()){
      this.toastService.warning(erro);
    } 
     
    return;
  }

  this.despesaVM = this.form!.value;

  this.despesasService.inserir(this.despesaVM).subscribe({
  next: (despesas: FormsDespesaViewModel) => this.processarSucesso(despesas),
  error: (erro: Error) => this.processarFalha(erro)  
  });
}
processarSucesso(despesas: FormsDespesaViewModel){
  this.toastService.success(`Despesa criada com sucesso!`, 'Sucesso');

  this.router.navigate(['/despesas/listar']);
}

processarFalha(erro: Error){
  this.toastService.error(erro.message, 'Erro');
}
}