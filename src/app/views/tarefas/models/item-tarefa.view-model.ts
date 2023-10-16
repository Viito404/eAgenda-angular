import { StatusItemEnum } from "./status-item.enum";

export type ItemTarefaViewModel = {
id?: string;
titulo: string;
status: StatusItemEnum;
concluido: boolean;
}