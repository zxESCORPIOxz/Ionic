import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  validation_messages = {
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'pattern', message: 'El email no es valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'Minimo 6 caracteres' },
      { type: 'pattern', message: 'La contraseña no es valida' }
    ]
  };

  errorMessage: any;


  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage
  ) {

    this.storage.create();

    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$')
        ])
      ),

      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[0-9]+$')
        ])
      )
    });

  }

  ngOnInit() {
  }

  loginUser(credentials) {
    this.authService.loginUser(credentials).then( (res: any) => {
      this.storage.set('isUserLoggedIn', true);
      this.storage.set('user_id', res.user.id);
      this.navCtrl.navigateForward('/menu');
    }).catch( err => {
      this.presentAlert('Opps', 'Hubo un error', err);
    });
  }

  async presentAlert(header, subHeader,message) {
    const alert = await this.alertController.create({
      // eslint-disable-next-line object-shorthand
      header: header,
      // eslint-disable-next-line object-shorthand
      subHeader: subHeader,
      // eslint-disable-next-line object-shorthand
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

}
