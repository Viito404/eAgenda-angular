import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { CompromissosRoutingModule } from './views/compromissos/compromissos-routing.module';
import { ContatosRoutingModule } from './views/contatos/contatos-routing.module';
import { CategoriasRoutingModule } from './views/categorias/categoria-routing.module';
import { DespesasRoutingModule } from './views/despesas/despesas-routing.module';
import { TarefasRoutingModule } from './views/tarefas/tarefas-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    NgbDatepicker,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass:  'toast-bottom-center',
      preventDuplicates: true,
    }),
    HttpClientModule,
    DashboardModule,
    CoreModule,
    CompromissosRoutingModule,
    ContatosRoutingModule,
    CategoriasRoutingModule,
    DespesasRoutingModule,
    TarefasRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
