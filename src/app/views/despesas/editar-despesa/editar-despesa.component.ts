import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsDespesaViewModel } from '../models/forms-despesa.view-model';
import { ListarCategoriasViewModel } from '../../categorias/models/listar-categorias.view-model';
import { DespesasService } from '../services/despesas.service';
import { CategoriasService } from '../../categorias/services/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html',
  styleUrls: ['./editar-despesa.component.css']
})
export class EditarDespesaComponent implements OnInit{
  form?: FormGroup;

  despesaFormVM?: FormsDespesaViewModel;
  categorias: ListarCategoriasViewModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private despesasService: DespesasService,
    private categoriasService: CategoriasService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
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

  this.categoriasService
  .selecionarTodos()
  .subscribe(
    (categoriasCadastradas) => (this.categorias = categoriasCadastradas)
  );

this.despesaFormVM = this.route.snapshot.data['despesa'];

this.form.patchValue(this.despesaFormVM!);

const dataFormatada = this.despesaFormVM?.data
  ?.toString()
  .substring(0, 10);

this.form.patchValue({ data: dataFormatada });
}

  gravar() {
    if (this.form?.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    const id = this.route.snapshot.paramMap.get('id')!;

    this.despesasService.editar(id, this.form?.value).subscribe((res) => {
      this.toastrService.success(
        `A despesa "${res.descricao}" foi salva com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/despesas', 'listar']);
    });
  }
}
