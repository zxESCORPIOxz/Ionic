import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage,
    private authService: AuthenticateService
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
    console.log(credentials);
    this.authService.loginUser(credentials).then( res => {
      this.errorMessage = '';
      this.storage.set('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/menu');
    }).catch( err => {
      this.errorMessage = err;
    });
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

}
