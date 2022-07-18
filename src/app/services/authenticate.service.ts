import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) {
    this.storage.create();
  }

  loginUser(credentials) {
    return new Promise((accept, reject) => {
      this.storage.get('user').then((data) => {
        data.password = atob(data.password);
        if (
          // eslint-disable-next-line eqeqeq
          credentials.email == data.email &&
          // eslint-disable-next-line eqeqeq
          credentials.password == data.password
        ) {
          accept('Login Exitoso');
        } else {
          reject('Login Fallido');
        }
      }).catch( err => reject('Fallo en el Login'));
    });
  }

  registerUser(userData) {
    userData.password = btoa(userData.password);
    //atoa() funcion para desencriptar
    return this.storage.set('user', userData);
  }

}
