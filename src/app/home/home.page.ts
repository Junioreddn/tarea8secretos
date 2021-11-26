/* eslint-disable eqeqeq */
/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  base64Image: any;
  public photos: any;
  secrets: any = [];
  errol: string;
  terminar: any;
  audiostorage: any;
  estado: string;
  secretForm = this.secForm.group({
    nombre: [''],
    fecha: [''],
    descripcion:[''],
    foto:[''],
    audio: ['']
  });
  constructor(private camera: Camera, private secForm: FormBuilder,  private sanitizer: DomSanitizer) { }
 //Toma Una Foto con la camara del Cell
  takePicture(): void{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      targetHeight: 1024,
      targetWidth: 1024,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then(imageData => {
     this.base64Image = `data:image/jpeg;base64,${imageData}`;
     this.photos.push(this.base64Image);
    }, (err) => {
     console.log(err);
    });
  };
  // Selecciona una foto de la galeria del cell
  choosePicture(): void{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      targetHeight: 1024,
      targetWidth: 1024,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then(imageData => {
     this.base64Image = `data:image/jpeg;base64,${imageData}`;
     this.photos.push(this.base64Image);
     console.log(this.photos);
    }, (err) => {
     console.log(err);
    });
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  saveSecrets(): void{

      var lista = [];
      var storage  = localStorage.getItem('storage');
      if(storage !== null){
        lista = JSON.parse(storage);
      }
      lista.push(this.secretForm.value);
      localStorage.setItem('storage', JSON.stringify(lista));
      console.log(this.secretForm.value);

      window.location.reload();
  }

  ngOnInit() {
  }

  begin(){
    this.deleted();
    VoiceRecorder.canDeviceVoiceRecord();
    VoiceRecorder.requestAudioRecordingPermission().then((resultado: GenericResponse) => {
       VoiceRecorder.hasAudioRecordingPermission().then((result: GenericResponse) => {
      if(result.value==true){
      this.estado = 'Grabando';
          VoiceRecorder.startRecording()
          .then((resulta: GenericResponse) => {
            console.log(resulta.value);
          })
          .catch(error => console.log(error));
      }
    });
    });
    this.errol='';
  }
  pause(){
    if (this.estado=='Grabando') {
     this.estado = 'Grabacion terminada';
     VoiceRecorder.stopRecording()
     .then((result: RecordingData) => {
       this.terminar = result.value;
     })
     .catch(error => console.log(error));
     this.errol = '';
    }else{
      this.errol = 'NO SE GRABA';
    }
  }
  deleted(){
    VoiceRecorder.stopRecording();
    this.estado='';
    this.terminar=null;
    this.errol = '';
  }
  cancelar()
  {
    window.location.reload();
  }


  getAudioContent(audio): SafeUrl {
    this.audiostorage = audio;
  if (this.audiostorage.includes('data')) {
    return this.sanitizer.bypassSecurityTrustUrl(this.audiostorage);
  } else {
    this.audiostorage = 'data:audio/webm;codecs=opus;base64,'+this.audiostorage;
    return this.sanitizer.bypassSecurityTrustUrl(this.audiostorage);
  }
}


}





