import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class LoadingService{
  private estaCarregando = new BehaviorSubject<boolean>(false);

  obterStatusCarregando(): Observable<boolean>{
    return this.estaCarregando.asObservable();
  }

  exibirCarregamento(){
    this.estaCarregando.next(true);
  }
  pararCarregamento(){
    this.estaCarregando.next(false);
  }
}