import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ResumenPage implements OnInit {
  mesa: string = '';
  recinto: string = '';
  totalAlcalde: number = 0;
  totalConcejal: number = 0;

  // Variable para almacenar la foto
  fotoActa: string | undefined = undefined;
  fotoActa2: string | undefined = undefined;
  constructor(private toastController: ToastController) {}

  ngOnInit() {
    this.mesa = localStorage.getItem('mesa') || '';
    this.recinto = localStorage.getItem('recinto') || '';
    this.totalAlcalde = Number(localStorage.getItem('totalA') || '0');
    this.totalConcejal = Number(localStorage.getItem('totalC') || '0');
    //this.cargarTotales();
  }

  cargarTotales() {
    const votosA = JSON.parse(localStorage.getItem('votosAlcalde') || '[]');
    const votosC = JSON.parse(localStorage.getItem('votosConcejal') || '[]');
    this.totalAlcalde = votosA.reduce((acc: number, curr: any) => acc + Number(curr.votos || 0), 0);
    this.totalConcejal = votosC.reduce((acc: number, curr: any) => acc + Number(curr.votos || 0), 0);
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


  async enviarDatos() {
    if (!this.mesa || !this.recinto || !this.fotoActa) {
      const msg = !this.fotoActa ? 'Debe tomar una foto del acta' : 'Complete Mesa y Recinto';
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    const payload = {
      mesa: this.mesa,
      recinto: this.recinto,
      totalAlcalde: this.totalAlcalde,
      totalConcejal: this.totalConcejal,
      foto: this.fotoActa, // Imagen en base64
      fecha: new Date().toISOString()
    };

    console.log('Enviando datos completos...', payload);
    // Aquí invocarías tu servicio de red
  }
}
