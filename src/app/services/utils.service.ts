import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loadctrl = inject (LoadingController);
  toastctrl = inject (ToastController);
  router = inject (Router);

  loading (){
    return this.loadctrl.create({spinner: 'crescent'})
  }

  async presentToast(options?: ToastOptions){
    const toast = await this.toastctrl.create(options);
    toast.present();

  }

  routerLink(url:string){
    return this.router.navigateByUrl(url);
  }

  saveInLocalStorage(key: string, value:any){
    return localStorage.setItem(key,JSON.stringify(value));
  }

  /*getFromLocalStorage(key:string){
    return JSON.parse(localStorage?.getItem(key));

  }*/


}
