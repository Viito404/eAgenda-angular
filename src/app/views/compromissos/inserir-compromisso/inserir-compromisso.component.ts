import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { CompromissosService } from '../services/compromissos.service';
import { ContatosService } from '../../contatos/services/contatos.service';
import { ListarContatoViewModel } from '../../contatos/models/listar-contatos.view-model';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css']
})
export class InserirCompromissoComponent implements OnInit{
  form?: FormGroup;
  compromissoVM!: FormsCompromissoViewModel;
  contatos: ListarContatoViewModel[] =[];

  constructor(
    private formBuilder: FormBuilder,
    private compromissoService: CompromissosService,
    private router: Router,
    private toastService: ToastrService,
    private contatosService: ContatosService
  ) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tipoLocal: new FormControl('', Validators.required),
      link: new FormControl(''),
      local: new FormControl(''),
      data: new FormControl('09/10/2023', [Validators.required]),
      horaInicio: new FormControl('09:30', [Validators.required]),
      horaTermino: new FormControl('10:30', [Validators.required]),
      contatoId: new FormControl('')
    });

    this.contatosService.selecionarTodos().subscribe((c) => this.contatos = c)
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

    this.compromissoVM = this.form!.value;

    this.compromissoService.inserir(this.compromissoVM).subscribe({
    next: (compromisso: FormsCompromissoViewModel) => this.processarSucesso(compromisso),
    error: (erro: Error) => this.processarFalha(erro)  
    });
  }
  processarSucesso(compromisso: FormsCompromissoViewModel){
    this.toastService.success(`Compromisso ${compromisso.assunto} inserido com sucesso!`, 'Sucesso');

    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(erro: Error){
    this.toastService.error(erro.message, 'Erro');
  }
}
