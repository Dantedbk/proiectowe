import { Component,ElementRef , OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, IonModal, LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import jsQR from 'jsqr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal
  code: any;
  scanActive = false;
  scanResult = null;
  @ViewChild('video',{static:false}) video: ElementRef;
  @ViewChild('canvas',{static:false}) canvas: ElementRef;
  videoElement: any;
  canvasElement: any;
  canvasContext: any;
  loading: HTMLIonLoadingElement;
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
  private api : ApiService,
  private barcodeScanner: BarcodeScanner,
  private toastCtrl: ToastController,
   private loadingCtrl: LoadingController) {}
  ngAfterViewInit(){  
   this.videoElement = this.video.nativeElement;
   this.canvasElement = this.canvas.nativeElement;
   this.canvasContext = this.canvasElement.getContext('2d');

  }

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
captar(){
  this.barcodeScanner.scan().then(barcodeData => {
    this.code = barcodeData.text;
    console.log('Barcode data', barcodeData);
   }).catch(err => {
       console.log('Error', err);
   });
}
async starscan(){
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {facingMode: 'environment'}
  });
  this.videoElement.srcObject = stream;
  this.videoElement.setAttribute('playsinline',true);
  this.videoElement.play();
  this.loading = await this.loadingCtrl.create({});
  await this.loading.present();
  requestAnimationFrame(this.scan.bind(this));
}
async scan(){
  console.log('SCAN');
  if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
    if(this.loading){
      await this.loading.dismiss();
      this.loading = null;
      this.scanActive = true;
    }
    this.canvasElement.height = this.videoElement.videoHeight;
    this.canvasElement.width = this.videoElement.videoWidth;
    this.canvasContext.drawImage(
      this.videoElement,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const imageData = this.canvasContext.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const code = jsQR(imageData.data, imageData.width,imageData.height,{
      inversionAttempts: 'dontInvert'
    });
    console.log('code: ',code);
    if(code){
      this.scanActive = false;
      this.scanResult = code.data;
      this.showQrToast();
      // alert(code.data.)
    }else{
      if(this.scanActive){
      requestAnimationFrame(this.scan.bind(this));
      }
    }
  }else{
    requestAnimationFrame(this.scan.bind(this));
  }
}
reset(){
  this.scanResult=null;
}
stopscan(){
  this.scanActive = false;
}
async showQrToast(){
  const toast = await this.toastCtrl.create({
message: `Open ${this.scanResult}?`,
position: 'top',
buttons:[{
  text: 'Open',
  handler: () =>{
    window.open(this.scanResult, '_system','location=yes');
  }
}]
  });
  toast.present();
}
}


