import { Component,OnDestroy,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-alcalde',
templateUrl: 'alcalde.page.html',
standalone: true,
imports: [IonicModule, CommonModule, FormsModule]
})

export class AlcaldePage implements OnInit, OnDestroy{
filaActiva: number | null = null; // Para rastrear la fila resaltada
candidatos = [
{partido:"UNE",nombre:"Hector Cartagena",logo:"une.jpg",votos:0},
{partido:"FAP",nombre:"Jaime Aduana",logo:"fap.png",votos:0},
{partido:"LIBRE",nombre:"Marcos Cabrera",logo:"libre.jpg",votos:0},
{partido:"MTS",nombre:"Ariel Ramallo",logo:"mts.jpg",votos:0},
{partido:"NGP",nombre:"Carlos López",logo:"ngp.jpg",votos:0},
{partido:"Soluciones con Todos",nombre:"Charles Becerra",logo:"sol.jpg",votos:0},
{partido:"Fuerza Social",nombre:"Roberto Sarabia",logo:"fs.jpg",votos:0},
{partido:"PDC",nombre:"Edwin Vargas",logo:"pdc.png",votos:0},
{partido:"APB-SUMATE",nombre:"Percy Rosas",logo:"sumate.png",votos:0},
{partido:"UN",nombre:"Eduardo Mérida",logo:"un.png",votos:0},
{partido:"UNIDOS",nombre:"Sergio Vasquez",logo:"unidos.jpg",votos:0},
{partido:"Alianza Patria",nombre:"Oscar Claros",logo:"patria.jpg",votos:0},
{partido:"A-UPP",nombre:"Monica Alvis",logo:"upp.jpg",votos:0},
{partido:"FRI",nombre:"Luis Santa Cruz",logo:"fri.png",votos:0}
];

blancos = 0;
nulos = 0;
//TotalVotos = 0;
mesa="";
constructor(private router: Router) {}

ngOnInit(): void {
   this.mesa = localStorage.getItem("mesa")!;
}
ngOnDestroy() {
    if (this.candidatos && this.candidatos.length > 0) {
      localStorage.setItem('votosAlcalde', JSON.stringify(this.candidatos));
      localStorage.setItem('blancosA', JSON.stringify(this.blancos));
      localStorage.setItem('nulosA', JSON.stringify(this.nulos));
      localStorage.setItem('totalA', JSON.stringify(this.total));
      console.log('Candidatos guardados automáticamente al salir');
    }
  }
get total() {

let suma = this.candidatos.reduce((a,b)=>a + Number(b.votos),0);

return suma + Number(this.blancos) + Number(this.nulos);

}

continuar(){

localStorage.setItem("votosAlcalde", JSON.stringify(this.candidatos));
localStorage.setItem('blancosA', JSON.stringify(this.blancos));
localStorage.setItem('nulosA', JSON.stringify(this.nulos));
localStorage.setItem('totalA', JSON.stringify(this.total));
this.router.navigate(['/concejales']);

}
soloNumeros(event:any){

let valor = event.target.value

valor = valor.replace(/[^0-9]/g,'')

event.target.value = valor

}
// Función para seleccionar el contenido al hacer foco
  seleccionarContenido(event: any) {
    // Usamos el input nativo dentro de ion-input
    const input = event.target.querySelector('input');
    if (input) {
      setTimeout(() => input.select(), 50);
    }
  }

  setFilaActiva(index: number | null) {
    this.filaActiva = index;
  }
  seleccionarContenido2(event: any) {
  const el = event.target as HTMLIonInputElement;
  el.getInputElement().then(input => {
    input.select();
  });
}

irAMesa() {
  // Aquí podrías poner un console.log o limpiar variables si fuera necesario
  this.router.navigate(['/mesa']);
}
}
