import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CompromissosRoutingModule } from './views/compromissos/compromissos-routing.module';
import { ContatosRoutingModule } from './views/contatos/contatos-routing.module';
import { CategoriasRoutingModule } from './views/categorias/categoria-routing.module';
import { DespesasRoutingModule } from './views/despesas/despesas-routing.module';
import { TarefasRoutingModule } from './views/tarefas/tarefas-routing.module';
import { RegistroModule } from './views/registro/registro.module';
import { LoginModule } from './views/login/login.module';
import { AuthService } from './core/auth/services/auth.service';
import { LocalStorageService } from './core/auth/services/local-storage.service';
import { httpTokenInterceptor } from './core/auth/interceptors/http-token.interceptor';

function logarUsuarioSalvo(authService: AuthService){
  return () => authService.logarUsuarioSalvo();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass:  'toast-bottom-center',
      preventDuplicates: true,
    }),
    HttpClientModule,

    CoreModule,
    RegistroModule,
    LoginModule,
    DashboardModule,
    
  ],
  providers: [
    {
provide: APP_INITIALIZER,
useFactory: logarUsuarioSalvo, 
deps: [AuthService],
multi: true,
    },
    provideHttpClient(withInterceptors([httpTokenInterceptor]))
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
