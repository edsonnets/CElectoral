import { Component } from '@angular/core';
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

export class MesaPage {

mesa = "";
recinto = "";

constructor(private router: Router) {}

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

