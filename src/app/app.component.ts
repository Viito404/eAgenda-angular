import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './core/loading/services/loading.service';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 estaCarregando$?:Observable<boolean>;

 constructor(private loadingService: LoadingService, private router:Router){
  this.router.events.subscribe((event: Event) =>{

    if(event instanceof NavigationStart){
      this.loadingService.exibirCarregamento();
    }
    else if(
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError 
    ){
      this.loadingService.pararCarregamento();
    }
  })
 }
  ngOnInit(): void {
    this.estaCarregando$ = this.loadingService.obterStatusCarregando();
  }
}
