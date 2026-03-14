import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {

  constructor(private router : Router ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      //let auth=localStorage.getItem('auth');
      let token = JSON.parse(localStorage.getItem('token')!);


        if(token){
          this.router.navigate(['tabs/inicio']);
          return false;

        }else{

          return true;
        }



  }
}
