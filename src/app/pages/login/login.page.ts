import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { StorageService } from 'src/app/services/storage.service';
import { ApiService } from 'src/app/services/api.service';
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
  lista = []
  temp : String


  constructor(
    private router : Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private appComponent : AppComponent,
    private storage : StorageService,
    private api : ApiService,

    ) { }

  ngOnInit() {
    this.api.getUsers();
    this.lista = this.api.listado;
    console.log(this.lista);
    this.storage.init();
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

    this.lista = this.api.listado.find(({username}) => username === this.usuario);
    if(this.usuario == null || "")
    {
      const toast = await this.toastController.create({
        message : "Falta escribir el nombre",
        duration: 2000
        
    })
    toast.present();

  }
    else if (this.contrasena ==  "")
    {
      const toast = await this.toastController.create({
        message : "Falta escribir la contraseña",
        duration: 2000
    })
    toast.present();
    }
    else if (this.contrasena !=  "1234")
    {
      const toast = await this.toastController.create({
        message : "contraseña invalida",
        duration: 2000
    })
    toast.present();
    }
    else 
    {
      localStorage.setItem('usuario',this.usuario.toString());
      this.storage.agregar('id', this.lista['id']);

// asd
      if (!this.status){
        this.router.navigate(['/profile', this.lista['id']]);
      }
      else {
        this.router.navigate(['/dprofile', this.lista['id']]);
      }

      this.mensaje = '';
    }
}
}
