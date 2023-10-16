import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompromissosRoutingModule } from '../compromissos/compromissos-routing.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule, CompromissosRoutingModule
  ]
})
export class DashboardModule { }
