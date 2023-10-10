import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css'],
})
export class EditarContatoComponent {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;
  idSelecionado: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatosService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
    });

    this.contatoVM = this.route.snapshot.data['contato'];



    this.form.patchValue(this.contatoVM);
  }

  gravar() {
    if (this.form.invalid) {
      for(let erro of this.form.validate()){
        this.toastService.warning(erro);
      }

      return;
    }
    
    this.contatoVM = this.form.value;
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;
    this.contatoService.editar(this.idSelecionado!, this.contatoVM).subscribe({
    next: (contato: FormsContatoViewModel) => this.processarSucesso(contato),
    error: (erro: HttpErrorResponse) => this.processarFalha(erro)
    });

  }
  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  get email() {
    return this.form.get('email');
  }
  processarSucesso(contato: FormsContatoViewModel){
    this.toastService.success(`Contato editado com sucesso!`, 'Sucesso');

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error){
    this.toastService.error(erro.message, 'Erro');
  }
}