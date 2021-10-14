import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(usuario: any) {
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario))
      .subscribe(data => {

        //Retorno http
        var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

        localStorage.setItem("token", token);
      },
      error => {
        console.error("Erro ao fazer Login");
      }
      
      )
  }
}
