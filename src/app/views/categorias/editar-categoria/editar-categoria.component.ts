import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { CompromissosService } from '../../compromissos/services/compromissos.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit{
  form?: FormGroup;

  categoriaFormVM?: FormsCategoriaViewModel;


  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
    });

    this.categoriaFormVM = this.route.snapshot.data['categoria'];

    this.form.patchValue(this.categoriaFormVM!);
  }

  gravar() {
    if (this.form?.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    const id = this.route.snapshot.paramMap.get('id')!;

    this.categoriasService.editar(id, this.form?.value).subscribe((res) => {
      this.toastrService.success(
        `A categoria "${res.titulo}" foi salva com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/categorias', 'listar']);
    });
  }
}
