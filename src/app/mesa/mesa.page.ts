import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-mesa',
templateUrl: 'mesa.page.html',
standalone: true,
imports: [IonicModule, CommonModule, FormsModule]
})

export class MesaPage implements OnInit {
user:any;
mesa = "";
recinto = "";
nom="";
constructor(private router: Router) {}

ngOnInit(): void {
  this.user = JSON.parse(localStorage.getItem('usuario')!);
  this.mesa=this.user.numTable;
  this.nom=this.user.name;
  this.recinto=this.user.institution;
}
continuar() {

localStorage.setItem("mesa", this.mesa);
localStorage.setItem("recinto", this.recinto);

this.router.navigate(['/alcalde']);

}
continuar2() {

localStorage.setItem("mesa", this.mesa);
localStorage.setItem("recinto", this.recinto);

this.router.navigate(['/concejales']);

}

}

