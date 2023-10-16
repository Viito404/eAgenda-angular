import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styleUrls: ['./inserir-categoria.component.css']
})
export class InserirCategoriaComponent implements OnInit{
form?: FormGroup;
categoriaVM!: FormsCategoriaViewModel;

constructor(
  private formBuilder: FormBuilder,
  private categoriasService: CategoriasService,
  private router: Router,
  private toastService: ToastrService,
) {}

ngOnInit(): void {
  this.form = this.formBuilder.group({
  titulo: new FormControl('',[Validators.required])
});
}

gravar() {
  if (this.form?.invalid) {
    
    for(let erro of this.form.validate()){
      this.toastService.warning(erro);
    } 
     
    return;
  }

  this.categoriaVM = this.form!.value;

  this.categoriasService.inserir(this.categoriaVM).subscribe({
  next: (categoria: FormsCategoriaViewModel) => this.processarSucesso(categoria),
  error: (erro: Error) => this.processarFalha(erro)  
  });
}

processarSucesso(categoria: FormsCategoriaViewModel){
  this.toastService.success(`Categoria ${categoria.titulo} inserida com sucesso!`, 'Sucesso');

  this.router.navigate(['/categorias/listar']);
}

processarFalha(erro: Error){
  this.toastService.error(erro.message, 'Erro');
}
}
