import { FormaPagamentoEnum } from "./forma-pagamento.enum";

export type FormsDespesaViewModel = {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPagamentoEnum;
  categorias: string[];
}