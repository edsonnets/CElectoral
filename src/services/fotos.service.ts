import { Camera, CameraResultType, CameraSource,CameraPhoto,Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

const IMAGE_DIR = 'images';

@Injectable({
  providedIn: 'root'
})

export class FotosService {
  photos: any[]=[];
  fileName:string='';
  constructor(
    private plt: Platform,
		private http: HttpClient,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController
  ) { }

  async addNewFoto(){
  const foto= await  Camera.getPhoto({
      resultType:CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 30

    });
  if (foto.webPath){
    this.fileName = new Date().getTime() + '.png';
    const response = await fetch(foto.webPath!);
    const blob = await response.blob();
    const myFile = new File([blob], this.fileName, {
      type: blob.type,
  });

     const base64Data = await this.readAsBase64(foto);

        const filePath = `${IMAGE_DIR}/${this.fileName}`;
              const savedFile = await Filesystem.writeFile({
                path: `${IMAGE_DIR}/${this.fileName}`,
                data: base64Data,
                directory: Directory.Data
            });

        let datos={
                file: myFile,
                path: foto.webPath,
                data: base64Data,
                dir: filePath,
                name:this.fileName
            }

            this.photos.unshift(datos);
  }

  }
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log('photo es: ',photo, 'base64 es :',base64Data);


  }

    private async readAsBase64(photo: Photo) {
       /* if (this.plt.is('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!
            });

            return file.data;
        }
        else {*/
            // Fetch the photo, read as a blob, then convert to base64 format
            const response = await fetch(photo.webPath!);
            const blob = await response.blob();

            return await this.convertBlobToBase64(blob) as string;

    }

// Helper function
    convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });


}
