import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  registerResult: boolean = true;
  errMessage;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  validation_messages = {
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio'},
      { type: 'maxlength', message: 'Maximo 40 caracteres' },
      { type: 'pattern', message: 'El nombre no es valido' }
    ],
    apellido: [
      { type: 'required', message: 'El apellido es obligatorio'},
      { type: 'maxlength', message: 'Maximo 40 caracteres' },
      { type: 'pattern', message: 'El apellido no es valido' }
    ],
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
    private navCtrl: NavController,
    private storage: Storage,
    private authService: AuthenticateService
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: new FormControl(
        '',
          Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('^[a-zA-Z]+$')
        ])
      ),
      apellido: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('^[a-zA-Z]+$')
        ])
      ),
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

  register(registerFormValues) {
    this.authService.registerUser(registerFormValues).then( (data) => {
      this.errMessage = '';
      this.navCtrl.navigateBack('/login');
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

  goToLogin() {
    this.navCtrl.navigateBack('/login').then((resp) => {
      console.log(resp);
    })
  }

}
