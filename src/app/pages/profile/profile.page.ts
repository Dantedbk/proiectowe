import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal

ide : String;
photo: any
image : SafeResourceUrl;
lista = []

constructor(
  private route : ActivatedRoute,
  private router : Router,
  private domSanitizer: DomSanitizer, 
  private alertCtrl : AlertController,
  private storage : StorageService,
  private api : ApiService

) { } 

message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
name: string;

cancel() {
  this.modal.dismiss(null, 'cancel');
}

ngOnInit() {
  this.ide = this.route.snapshot.paramMap.get('id');
  this.api.getPosts(this.ide);
  this.lista = this.api.listado;
  console.log(this.ide);
  console.log(this.lista);
}

nombre:string = localStorage.getItem('usuario')


confirm() {
  this.modal.dismiss(this.name, 'confirm');
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
    this.message = `Hello, ${ev.detail.data}!`;
  }
}



volverHome() {
  this.router.navigate(["./home"])
  localStorage.clear();
}

async takePhoto(){
  const result = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    source: CameraSource.Camera,
    resultType: CameraResultType.Base64
  });

  this.image = this.domSanitizer.bypassSecurityTrustResourceUrl(result && result.base64String)
};
cerrarSesion(){
  
  this.storage.limpiar();
  this.router.navigate(['/home']);
}
verPosts(){

}
}

