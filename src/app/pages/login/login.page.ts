import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mensaje : String
  usuario : String
  contrasena : String
  tipo : String
  status : false
  constructor(
    private router : Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private appComponent : AppComponent
    ) { }

  ngOnInit() {
  }



  volverHome() {
    this.router.navigate(["./home"])
  }

  recuperar(){
    this.router.navigate(["./recover"])
  }
  goToRegistro() {
    this.router.navigate(['./registro'])
  }


  cambiar() {
    if (this.status) {
      document.getElementById("perfil").innerHTML = "Docente ";
    }
    else {
      document.getElementById("perfil").innerHTML = "Alumno ";

    }
  }

  async ingresar (){

    if(this.usuario == null || "")
    {
      const toast = await this.toastController.create({
        message : "Falta escribir el nombre",
        duration: 2000
        
    })
    toast.present();

  }
    else if (this.contrasena == null || "")
    {
      const toast = await this.toastController.create({
        message : "Falta escribir la contraseña",
        duration: 2000
    })
    toast.present();
    }
    else 
      this.router.navigate(["./profile"])
      localStorage.setItem('usuario',this.usuario.toString())
      this.usuario = null
      this.contrasena = null
}



}
