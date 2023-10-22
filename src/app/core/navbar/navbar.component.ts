import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
colapsado: boolean = true;
usuarioLogado$?: Observable<boolean>

constructor(
  private authService: AuthService,
  private toastService: ToastrService,
  private router: Router
){}

  ngOnInit(): void {
    this.usuarioLogado$ = this.authService.obterUsuarioAutenticado().pipe(
      map(usuario => {
        if(!usuario)
        return false;

        return true;
      })
    );
  }

  sair(): void{
this.authService.logout().subscribe(() =>{
this.router.navigate(['/login']);
});
  }
}
