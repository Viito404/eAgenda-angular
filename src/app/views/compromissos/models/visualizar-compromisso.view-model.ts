import { ListarContatoViewModel } from "../../contatos/models/listar-contatos.view-model";
import { LocalCompromissoEnum } from "./tipo-local.enum";

export type VisualizarCompromissoViewModel = {
  
    id: string;
    assunto: string;
    
    tipoLocal: LocalCompromissoEnum;
    link: string;
    local: string;
  
    data: Date;
    horaInicio: string;
    horaTermino: string;
    
    contato?: ListarContatoViewModel;
  }
  

