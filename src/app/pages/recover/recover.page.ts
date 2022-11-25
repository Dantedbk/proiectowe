import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  correo : String
  name: string;
  lista:any;
  ide:string;

  constructor(
    private router : Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api : ApiService) { }


  async ngOnInit() {
    this.api.getUsers();
    this.lista = this.api.listado;
  }
  nombre:any = JSON.parse(localStorage.getItem('weon'));

  volverLogin() {
    this.router.navigate(["./login"])
  }

  async recuperar(){
    let regex = new RegExp(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)
    if (this.correo == null || "" ){
      const alert = await this.alertController.create({
        header : "Error",
        message : "Introduzca un correo electronico",
        buttons: ["Volver"]
    })
    alert.present();
    }
    else if (!regex.test(this.correo.toString())){
      const alert = await this.alertController.create({
        header : "Error",
        message : "Formato de correo invalido",
        buttons: ["Volver"]
    })
    this.correo = null
    alert.present();
    }
    else if (this.correo != null || ""){
      this.correo = null
      const toast = await this.toastController.create({
        message : "Correo de recuperacion enviado",
        duration: 2000

    })
    toast.present();
    }
  }
}