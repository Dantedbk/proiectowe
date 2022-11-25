import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import jsQR from 'jsqr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dprofile',
  templateUrl: './dprofile.page.html',
  styleUrls: ['./dprofile.page.scss'],
})
export class DprofilePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  
  public angularQrCode: string = '';
  constructor( private router: Router) { 
    
  this.angularQrCode = "'https://github.com/Cordobo/angularx-qrcode'"
  }

  async ngOnInit() {
    document.getElementById("wea").innerHTML = localStorage.getItem('usuario')
    console.log('aaazxcaa')
  }

  nombre:string = localStorage.getItem('usuario')

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

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
}
