import { Component, Input } from '@angular/core';
import { ListarDespesasViewModel } from '../models/listar-despesas.view-model';

@Component({
  selector: 'app-card-despesa',
  templateUrl: './card-despesa.component.html',
  styleUrls: ['./card-despesa.component.css']
})
export class CardDespesaComponent {
  @Input({ required: true }) despesa!: ListarDespesasViewModel;
}
