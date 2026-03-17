import { Component,OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-concejales',
templateUrl: 'concejales.page.html',
standalone: true,
imports: [IonicModule, CommonModule, FormsModule]
})

export class ConcejalesPage implements OnInit, OnDestroy{
filaActiva: number | null = null;
concejales= [
    { "id": 1, "partido": "UNE", "candidato": "BLADIMIR VARGAS ROJAS", "logo": "une.jpg", "votos": 0 },
    { "id": 2, "partido": "FAP", "candidato": "HEEDY GIOVANNA FLORES RODRIGUEZ", "logo": "fap.png", "votos": 0 },
    { "id": 3, "partido": "LIBRE", "candidato": "LIVIO JHASMANY TERAN ZENTENO", "logo": "libre.jpg", "votos": 0 },
    { "id": 4, "partido": "MTS", "candidato": "JOHNNY ROQUE OCHOA", "logo": "mts.jpg", "votos": 0 },
    { "id": 5, "partido": "NGP", "candidato": "KARINA AMPARO RICO MUÑOZ", "logo": "ngp.jpg", "votos": 0 },
    { "id": 6, "partido": "Soluciones con Todos", "candidato": "CASTO RODRIGUEZ CHOQUE", "logo": "sol.jpg", "votos": 0 },
    { "id": 7, "partido": "Fuerza Social", "candidato": "JOSE LUIS FERNANDEZ QUINT", "logo": "fs.jpg", "votos": 0 },
    { "id": 8, "partido": "PDC", "candidato": "ESTEFANIA TORREZ SAN MIGUEL", "logo": "pdc.png", "votos": 0 },
    { "id": 9, "partido": "APB-SUMATE", "candidato": "LEYDI CARLA SANTOS ESCALE", "logo": "sumate.png", "votos": 0 },
    { "id": 10, "partido": "UN", "candidato": "DARIO JOSE ANTEZANA VARGAS", "logo": "un.png", "votos": 0 },
    { "id": 11, "partido": "UNIDOS", "candidato": "ALVARO LIMA LOPEZ", "logo": "unidos.jpg", "votos": 0 },
    { "id": 12, "partido": "Alianza Patria", "candidato": "ROSA MAVEL PADILLA MENDIETA", "logo": "patria.jpg", "votos": 0 },
    { "id": 13, "partido": "A-UPP", "candidato": "REYNALDO LAFUENTE TERRAZAS", "logo": "upp.jpg", "votos": 0 },
    { "id": 14, "partido": "FRI", "candidato": "DENIS ALBARO CABERO RIOS", "logo": "fri.png", "votos": 0 }
  ]

blancosC = 0;
nulosC = 0;
mesa="";
constructor(private router: Router) {}

ngOnInit(): void {
    this.mesa = localStorage.getItem("mesa")!;
}
ngOnDestroy(): void {
  localStorage.setItem("votosConcejales", JSON.stringify(this.concejales));
  localStorage.setItem('blancosC', JSON.stringify(this.blancosC));
  localStorage.setItem('nulosC', JSON.stringify(this.nulosC));
  localStorage.setItem('totalC', JSON.stringify(this.total));
}
get total() {

let suma = this.concejales.reduce((a,b)=>a + Number(b.votos),0);

return suma + Number(this.blancosC) + Number(this.nulosC);

}

continuar(){

localStorage.setItem("votosConcejales", JSON.stringify(this.concejales));
localStorage.setItem('blancosC', JSON.stringify(this.blancosC));
localStorage.setItem('nulosC', JSON.stringify(this.nulosC));
localStorage.setItem('totalC', JSON.stringify(this.total));
this.router.navigate(['/resumen']);

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
}
