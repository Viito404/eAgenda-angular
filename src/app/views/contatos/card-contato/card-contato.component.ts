import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contatos.view-model';
@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css'],
})
export class CardContatoComponent {
  @Input({ required: true }) contato!: ListarContatoViewModel;

  @Output() onFavoritarClicado: EventEmitter<ListarContatoViewModel>;

  constructor() {
    this.onFavoritarClicado = new EventEmitter();
  }

  favoritarContato(contato: ListarContatoViewModel) {
    this.onFavoritarClicado.emit(contato);
  }
  
}
