import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { TokenViewModel } from "../models/token.view-model";
import { RegistrarUsuarioViewModel } from "../models/registrar-usuario.view-model";
import { LocalStorageService } from "./local-storage.service";
import { AutenticarUsuarioViewModel } from "../models/autenticar-usuario.view-model";
import { UsuarioTokenViewModel } from "../models/usuario-token.view-model";
import { Token } from "@angular/compiler";

@Injectable()
  export class AuthService{
    private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/conta/';

    private endpointRegistrar: string = this.endpoint + 'registrar';
    private endpointAutenticar: string = this.endpoint + 'autenticar';
    private endpointSair: string = this.endpoint + 'sair';

    private usuarioAutenticado: BehaviorSubject<UsuarioTokenViewModel | undefined>

  constructor(
    private http: HttpClient,
     private localStorageService: LocalStorageService) { 
      this.usuarioAutenticado = new BehaviorSubject<UsuarioTokenViewModel | undefined>(undefined);
     }

  public obterUsuarioAutenticado(){
    return this.usuarioAutenticado.asObservable();
  }

  public registrar(
    usuario: RegistrarUsuarioViewModel
  ): Observable<TokenViewModel> {
    return this.http
    .post<any>(this.endpointRegistrar, usuario)
    .pipe(
      map((res) => res.dados),

      tap((dados: TokenViewModel) => this.localStorageService.salvarDadosUsuario(dados)),
      
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }
  public login(
    usuario: AutenticarUsuarioViewModel
  ): Observable<TokenViewModel> {
    return this.http
    .post<any>(this.endpointAutenticar, usuario)
    .pipe(
      map((res) => res.dados),

      tap((dados: TokenViewModel) => this.localStorageService.salvarDadosUsuario(dados)),
      tap((dados: TokenViewModel) => this.notificarLogin(dados.usuarioToken)),

      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }
  public logout():Observable<any> {
    return this.http.post<any>(this.endpointSair, {}, this.obterHeadersAutorizacao())
    .pipe(
     tap(()=> this.notificarLogout()),
     tap(()=> this.localStorageService.limparDadosLocais()))
  }

  private notificarLogin(usuario: UsuarioTokenViewModel): void {
    this.usuarioAutenticado.next(usuario);
  }

  private notificarLogout(): void{
    this.usuarioAutenticado.next(undefined);
  }
  private processarErroHttp(erro: HttpErrorResponse){
    let mensagemErro = '';

    if (erro.status == 0)
      mensagemErro = 'Ocorreu um erro ao processar a requisição.';
    if (erro.status == 401)
      mensagemErro = 'O usuário não está autorizado. Efetue login e tente novamente.';
    else mensagemErro = erro.error?.erros[0];

    return throwError(() => new Error(mensagemErro));
  }
  public logarUsuarioSalvo(){
    const dados = this.localStorageService.obterDadosLocais();

    if(!dados) return;

    const tokenValido: boolean = new Date(dados.dataExpiracao) > new Date();

    if(tokenValido)
    this.notificarLogin(dados.usuarioToken);
  }
  private obterHeadersAutorizacao() {
    const token = this.localStorageService.obterDadosLocais()?.chave;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
  } 