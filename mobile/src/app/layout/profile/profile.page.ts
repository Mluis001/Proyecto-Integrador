import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/CRUD/user.service';
import { User } from 'src/app/models/User';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('fotoInput') fotoInput;
  cambiandoClaves = false;
  clavesCoinciden = false;
  clave: String = '';
  claveConfirm: String = '';
  user: User;
  fotoPerfil: any = 'assets/images/accounts.png';

  constructor(private camera: Camera, private toastController: ToastController, private authDataServise: AuthService, private userDataService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
    }).catch( e => console.log(e));
  }

  verificarCambioClaves() {
    if (this.clave.length !== 0 || this.claveConfirm.length !== 0) {
      this.cambiandoClaves = true;
    } else {
      this.cambiandoClaves = false;
    }
    if (this.clave === this.claveConfirm) {
      this.clavesCoinciden = true;
    } else {
      this.clavesCoinciden = false;
    }
  }

  guardar() {
    this.userDataService.put(this.user).then( r => {
      if (this.cambiandoClaves && this.clavesCoinciden) {
        this.actualizarClave();
      } else {
        this.presentToastWithOptions('Datos guardados satisfactoriamente. Cierre sesión para visualizar los cambios.', 'middle', 'Aceptar', 'success').then(
          r_success => {
            r_success.onDidDismiss().then( r2 => {
            });
          }
        );
      }
    }).catch ( e => console.log(e));
  }

  actualizarClave() {
    this.authDataServise.password_change(this.clave).then( r => {
      this.presentToastWithOptions('Datos guardados satisfactoriamente. Cierre sesión y utilice su nueva contraseña.', 'middle', 'Aceptar', 'success').then(
        r_success => {
          r_success.onDidDismiss().then( r2 => {
          });
        }
      );
    }).catch( e => {
      console.log(e);
    });
  }

  getPicture(): void {
    if (Camera['installed']()) {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true
      };
      this.camera.getPicture(options).then((imageData) => {
        const nombreArchivo = 'foto_desde_camara.jpg';
        const tipoArchivo = 'image/jpeg';
        const adjunto = imageData;
        this.fotoPerfil = 'data:' + tipoArchivo + ';base64,' + adjunto;
       }, (err) => {
        this.fotoPerfil = 'assets/images/accounts.png';
      });
    } else {
      this.fotoInput.nativeElement.click();
    }
  }

  desdeAlmacenamiento() {
    this.fotoInput.nativeElement.click();
  }

  subirImagen(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const nombreArchivo = file.name;
        const tipoArchivo = file.type;
        const adjunto = reader.result;
        this.fotoPerfil = adjunto;
      };
    }
  }

  async presentToastWithOptions(message, position, closeButtonText, color) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: position,
      color: color,
      closeButtonText: closeButtonText
    });
    toast.present();
    return toast;
  }
}
