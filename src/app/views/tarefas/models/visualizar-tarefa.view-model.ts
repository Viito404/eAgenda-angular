import { ItemTarefaViewModel } from "./item-tarefa.view-model";

export type VisualizarTarefaViewModel = {
  id: string;
  titulo: string;
  dataCriacao: Date;
  dataConclusao?: Date;

  quantidadeItens: number;
  percentualconcluido: number;

  prioridade: string;
  situacao: string;

  itens: ItemTarefaViewModel[];

}