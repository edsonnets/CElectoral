import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ContribuyenteService } from 'src/app/services/contribuyente.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ResumenPage implements OnInit {
  idMesa: number = 0  ;
  idRecinto: number = 0;
  mesa: string = '';
  recinto: string = '';
  blancosA: number = 0;
  nulosA: number = 0;
  nulosC: number = 0;
  blancosC: number = 0;
  totalAlcalde: number = 0;
  totalConcejal: number = 0;
  user: any;
  userId: number = 0;
  // Variable para almacenar la foto
  fotoActa: string | undefined = undefined;
  fotoActa2: string | undefined = undefined;
  candidatos: any[] = [];
  votosA: any[] = [];
  votosC: any[] = [];
  constructor(private toastController: ToastController, private back: ContribuyenteService, private router: Router, private alertController: AlertController) {}

  ngOnInit() {
        this.mesa = localStorage.getItem('mesa') || '';
        this.recinto = localStorage.getItem('recinto') || '';
        this.totalAlcalde = Number(localStorage.getItem('totalA') || 0);
        this.totalConcejal = Number(localStorage.getItem('totalC') || 0);
        this.user = JSON.parse(localStorage.getItem('usuario')!);
        this.blancosA = Number(localStorage.getItem('blancosA') || 0);
        this.nulosA = Number(localStorage.getItem('nulosA') || 0);
        this.blancosC = Number(localStorage.getItem('blancosC') || 0);
        this.nulosC = Number(localStorage.getItem('nulosC') || 0);
        this.votosA = JSON.parse(localStorage.getItem('votosAlcalde') || '[]');
        this.votosC = JSON.parse(localStorage.getItem('votosConcejales') || '[]');
        console.log('Votos Alcalde:', this.votosA);
        console.log('Votos Concejal:', this.votosC);
        this.userId = this.user.userId;
        this.back.getAllCandidatos().subscribe(
          (datos) => {
            console.log('Candidatos recibidos:', datos);
            this.candidatos = datos.data;
            this.cargarTotales();
            console.log('Datos Candidatos Alcalde:', this.candidatos)
          }
        );
        this.cargarTotales();

  }
  cargarTotales() {
    const votosA = JSON.parse(localStorage.getItem('votosAlcalde') || '[]');
    const votosC = JSON.parse(localStorage.getItem('votosConcejales') || '[]');
    this.totalAlcalde = votosA.reduce((acc: number, curr: any) => acc + Number(curr.votos || 0), 0);
    this.totalConcejal = votosC.reduce((acc: number, curr: any) => acc + Number(curr.votos || 0), 0);
    console.log('Totales calculados - Alcalde:', this.totalAlcalde, 'Concejal:', this.totalConcejal);
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera // Abre la cámara directamente
    });

    this.fotoActa = `data:image/jpeg;base64,${image.base64String}`;
  }
  async tomarFoto2() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera // Abre la cámara directamente
    });

    this.fotoActa2 = `data:image/jpeg;base64,${image.base64String}`;
  }
   encontrarID(tipo: number, partido: string): number {
    console.log('Buscando ID para tipo:', tipo, 'y partido:', partido);
    const candidato = this.candidatos.find(c => (c.election_type_category_id) == tipo && c.party.trim().toLowerCase() === partido.trim().toLowerCase());
    console.log('Candidato encontrado:', candidato);
    return candidato ? candidato.id : 0; // Retorna el ID del candidato o 0 si no se encuentra

  }

  async enviarDatos() {
    /* if (!this.mesa || !this.recinto || !this.fotoActa) {
      const msg = !this.fotoActa ? 'Debe tomar una foto del acta' : 'Complete Mesa y Recinto';
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    } */

    const payload = {
      mesa: this.mesa,
      recinto: this.recinto,
      totalAlcalde: this.totalAlcalde,
      totalConcejal: this.totalConcejal,
      foto: this.fotoActa, // Imagen en base64
      fecha: new Date().toISOString()
    };

    console.log('Enviando datos completos...', payload);
    const tales= [];


    for (let i = 0; i <= 13; i++) {

    // Creamos el objeto con las llaves que necesitas
    if(Number(this.votosA[i].votos) > 0){
    const nuevoRegistro = {
        "voting_table_id": Number(this.user.idTable),
        "election_type_category_id": 4,
        "quantity":Number(this.votosA[i]?.votos || 0),
        "candidate_id": Number(this.encontrarID(4, this.votosA[i].partido )),
        "election_type_id": 1,
        "user_id":Number(this.userId)
        }
        tales.push(nuevoRegistro);
    }
    if(Number(this.votosC[i].votos) > 0){
    const nuevoRegistro2 = {
        "voting_table_id": Number(this.user.idTable),
        "election_type_category_id": 5,
        "quantity": Number(this.votosC[i]?.votos || 0),
        "candidate_id": Number(this.encontrarID(5, this.votosC[i].partido)),
        "election_type_id": 2,
        "user_id": Number(this.userId)
        };
        tales.push(nuevoRegistro2);
      }

    }
    console.log('Votos a enviar por candidato:', tales);
    console.log('Votos válidos Alcalde:', this.totalAlcalde, this.blancosA, this.nulosA);
    console.log('Votos válidos Concejal:', this.totalConcejal, this.blancosC, this.nulosC);
    let todosA:number  = Number(this.totalAlcalde) + Number(this.blancosA) + Number(this.nulosA);
    let todosC:number  = Number(this.totalConcejal) + Number(this.blancosC) + Number(this.nulosC);

    // Aquí invocarías tu servicio de red
    const envio={
    "categoryResult":[ {
        "voting_table_id": Number(this.user.idTable),
        "election_type_category_id": 4,
        "valid_votes": this.totalAlcalde ?this.totalAlcalde:0,//this.totalAlcalde - this.blancosA - this.nulosA,
        "blank_votes": this.blancosA?this.blancosA:0,
        "null_votes": this.nulosA?this.nulosA:0,
        "total_votes": todosA ?todosA:0,
        "is_consistent": true,
        "status": "entered",
        "entered_by": Number(this.userId)
    },
    {
      "voting_table_id": Number(this.user.idTable),
        "election_type_category_id": 5,
        "valid_votes": this.totalConcejal ?this.totalConcejal:0,//this.totalAlcalde - this.blancosA - this.nulosA,
        "blank_votes": this.blancosC?this.blancosC:0,
        "null_votes": this.nulosC?this.nulosC:0,
        "total_votes": todosC ?todosC:0,
        "is_consistent": true,
        "status": "entered",
        "entered_by": Number(this.userId)
    }
  ],
    "votesByCandidate": tales
    }
    console.log('Payload final a enviar:', envio);
    this.back.Guardavotos(envio).subscribe(
    { next: (data:any)=>{
        this.mostrarMensaje('Datos enviados correctamente');
        console.log('Respuesta del servidor:', data);

      },
      error: (error)=>{
        this.mostrarMensaje(error.error?.message || 'Error al enviar datos');
        console.log('Error al enviar datos:', error);
      }
  });

  }

  async onLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salir',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }
  logout() {
    // 1. Borrar tokens o datos de sesión
    localStorage.removeItem('user_token');
    localStorage.clear(); // Opcional: limpia todo el storage

    // 2. Si usas cookies con withCredentials, el backend debería tener
    // un endpoint para limpiar la cookie, pero en el front simplemente:

    // 3. Redirigir a la pantalla de Login
    // Use 'replaceUrl' para que el usuario no pueda volver atrás con el botón del móvil
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  async mostrarMensaje(cadena: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: cadena,
      buttons: ['OK'], // El botón simple
      backdropDismiss: false // Evita que se cierre al tocar fuera (opcional)
    });

    await alert.present();
  }

}
