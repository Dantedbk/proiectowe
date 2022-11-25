import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: String
  contrasena: String
  contrasena2: String
  correo: String
  rut : String
  dv : String

  constructor(private router: Router,
    private alertController: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  volverLogin() {
    this.router.navigate(["./login"])
  }

  clear(){
    this.correo = null
    this.contrasena = null
    this.contrasena2 = null
    this.usuario = null
    this.rut = null
    this.dv = null
  }
  async Crear() {

    let regex = new RegExp(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)
    let wiwiwi = "Campos: "
    let flag = 0
    if (this.usuario == null || "") { wiwiwi += "usuario, "; flag = 1 }
    if ((this.contrasena == null || "") && (this.contrasena2 == null || "")) { wiwiwi += "contraseña, "; flag = 1 }
    if (this.correo == null || "") { wiwiwi += "correo vacíos"; flag = 1 }
    else if (!regex.test(this.correo.toString())) { wiwiwi += "formato de correo invalido"; flag = 2 }
    else if (flag == 1) {wiwiwi += "vacíos"}
    if ((this.contrasena != this.contrasena2)) { wiwiwi += ", contraseñas no coinciden"; flag = 1 }
    
    
    // barcodescanner jqr


    var suma = 0;
    var serie = 2
    
    if (this.rut != null || "") {
      var reverseRut = this.rut.toString().split("").reverse().join("");
      for (var i = 0; i < reverseRut.length; i++) {
        suma += serie * parseInt(reverseRut[i])
        serie++
        if (serie > 7){
          serie = 2
        }
       }
    }

     var sumaDv = (11 - (suma - Math.trunc(suma/11)*11))
     if (!(this.dv == sumaDv.toString() || this.dv == '0' && sumaDv.toString() == '11'||  this.dv == 'k' && sumaDv.toString() == '10'))
     {
      wiwiwi += ", rut invalido"; flag = 1
     }
     
    if (flag == 1) {
      
      const alert = await this.alertController.create({
        header: "Error",
        message: wiwiwi,
        buttons: ["Aceptar"]
      })
      alert.present();
      this.clear()
      
    }
    else if (flag == 0) {
      const toast = await this.toastController.create({
          message: "Cuenta creada",
          duration: 2000
          
        })
        toast.present();
        this.clear()
      }
    }
  }
