import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import jsQR from 'jsqr';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-dprofile',
  templateUrl: './dprofile.page.html',
  styleUrls: ['./dprofile.page.scss'],
})
export class DprofilePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message = 'c:';
  name: string;
  lista:any;
  ide:string;
  urlwea: string;
  
  public angularQrCode: string = '';
  route: any;
  constructor( 
    private router: Router,
    private api : ApiService,) { 

  this.urlwea = "'https://morioh.com/p/daae448bccb6'"
  }

  async ngOnInit() {
    document.getElementById("wea").innerHTML = localStorage.getItem('usuario')
    this.api.getAsignaturas();
    this.lista = this.api.listado;
  }

  nombre:any = JSON.parse(localStorage.getItem('weon'));

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
