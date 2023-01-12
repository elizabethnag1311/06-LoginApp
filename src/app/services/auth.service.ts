import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyDBF-3HKWL0g7l6281AXib2hBcdH3449NY';

  userToken: string | null = '';

 //nuevo usuario
 // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

 //usuario autenticado
 // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) { 
    this.leerToken();
  }

  logout() {

  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,
        authData
    ).pipe(
      map( (resp: any) => {
        this.guardarToken( resp.idToken);
        return resp;
      })
    );
  }

  usuarioNuevo( usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apiKey}`,
        authData
    ).pipe(
      //si la peticion regresa un error el map no se ejecutara
      map( (resp: any) => {
        this.guardarToken( resp.idToken);
        return resp;
      })
    );
  }

  private guardarToken( idToken: string) {

    this.userToken = idToken
    localStorage.setItem('token', idToken)
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    }else {
      this.userToken = '';
    }
    return this.userToken;
  }
}
