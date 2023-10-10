import { LocalCompromissoEnum } from "./tipo-local.enum";

export type FormsCompromissoViewModel = {
  assunto: string;
  
  tipoLocal: LocalCompromissoEnum;
  link: string;
  local: string;

  data: Date;
  horaInicio: string;
  horaTermino: string;
  
  contatoId?: string;
}
