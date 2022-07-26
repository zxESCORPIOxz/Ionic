import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  header = {'Access-Control-Request-Headers': '*',  'Content-Type': 'application/json'};

  // eslint-disable-next-line @typescript-eslint/naming-convention
  url_server = 'https://music-back-seminario.herokuapp.com/';
  httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json', observe: 'response' })
  };

  constructor(private storage: Storage, private http: HttpClient) {
    this.storage.create();
  }

  loginUser(credentials) {
    // eslint-disable-next-line prefer-const
    let params = {
      // eslint-disable-next-line quote-props
      'user': credentials
    };
    return new Promise((accept, reject) => {
      this.http.post(`${this.url_server}login`, params, this.httpOptions)
      .subscribe((data: any) => {
        // eslint-disable-next-line eqeqeq
        if ( data.status == 'OK') {
          accept(data);
        } else {
          reject('Email o Contraseña Invalida');
        }
      },
      (error) => {
        reject('Error en la peticion');
      }
      );
    });
  }

  registerUser(userData) {
    //userData.password = btoa(userData.password);
    //return this.storage.set('user', userData)
    // eslint-disable-next-line prefer-const
    let params = {
      // eslint-disable-next-line quote-props
      'user': userData
    };
    return new Promise ((accept, reject) => {
      this.http.post(`${this.url_server}signup`, params, this.httpOptions).subscribe((data: any) => {
        // eslint-disable-next-line no-cond-assign, eqeqeq
        if (data.status == 'OK') {
          accept(data.msg);
        }else{
          reject(data.errors);
        }
      },
      (error) => {
        reject('Error en la peticion');
      }
      );
      });
  }

}
