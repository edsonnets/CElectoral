import { Component, OnInit, inject } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { UtilsService } from '../services/utils.service';
//import {User} from '../../models/user.model'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContribuyenteService } from 'src/app/services/contribuyente.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule],

})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email : new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),

 })

  UtilsService = inject(UtilsService)

  username!: string;
  password!: string;
  userlist:any[]=[];
  constructor( private route:Router, private user: ContribuyenteService) {

   }

  ngOnInit() {
    localStorage.removeItem("token");
    //this.cargarUsers();
  }

  onSubmitLogin(){

  /*this.user.login(this.username, this.password).subscribe(
    { next: (data:any)=>{
      localStorage.removeItem('usuario');
      console.log('El data de user es : ',data)
          let usuario= data;
          if(usuario){
            let finded= this.userlist.filter((dato)=>{
             return dato.uuidUsuario==usuario.uuid;
            })//this.userlist.filter((data)=>data.uuidUsuario==usuario.uuid)
            console.log('El ecnontrado es: ',finded)
            if (finded.length>0){
              console.log('El ecnontrado es: ',finded)
              //localStorage.setItem('auth',JSON.stringify(finded[0].uuidUsuario));
              localStorage.setItem('usuario',JSON.stringify(finded[0]))

              this.route.navigate(["/tabs/Inicio"]);
            }
            //localStorage.setItem('user', JSON.stringify(usuario))

          }
          //this.route.navigate(["/tabs/Inicio"]);
        },
      error: (error)=>{
            console.log('Error !: ',error)
      }

    }
  );*/

  }
  async submit(){
    if (this.form.valid){
       const loading = await this.UtilsService.loading();
       await loading.present();
       let name = this.form.value.email;
       let pass = this.form.value.password;
       localStorage.removeItem('token');
       /*if(name=="admin" && pass=="admin"){
         localStorage.setItem('token',JSON.stringify("admin"))
          this.route.navigate(["/mesa"]);
          loading.dismiss();
       }
       else
        {
          this.UtilsService.presentToast({
                  message: "Credenciales incorrectas",
                  duration: 2500,
                  color: 'primary'
                })
                loading.dismiss();
        }*/
       this.user.login(name!,pass!).subscribe(
        { next: (data:any)=>{
          console.log('El data de user es : ',data)
              let usuario= data.user;
              if(usuario){
                  console.log('Data es: ',data)
                  console.log('El logeado es: ',usuario)
                  //localStorage.setItem('token',JSON.stringify(data.token))
                  localStorage.setItem('usuario',JSON.stringify(usuario))
                  localStorage.setItem('mesa',JSON.stringify(usuario.mesa))
                  localStorage.setItem('usuario',JSON.stringify(usuario))

                  this.route.navigate(["/mesa"]);
                //localStorage.setItem('user', JSON.stringify(usuario))

              }
              //this.route.navigate(["/tabs/Inicio"]);
              loading.dismiss();
            },
          error: (error)=>{
                console.log('Error !: ',error)
                this.UtilsService.presentToast({
                  message: error.message,
                  duration: 2500,
                  color: 'primary'
                })
                loading.dismiss();

          }

        }
      )






   }
  }
}
