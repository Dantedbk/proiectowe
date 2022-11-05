import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

photo: any
image : SafeResourceUrl;

constructor(
  private router : Router,
  private domSanitizer: DomSanitizer, 
  private alertCtrl : AlertController
) { } 

ngOnInit() {
  document.getElementById("wea").innerHTML = localStorage.getItem('usuario')
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
}

}

