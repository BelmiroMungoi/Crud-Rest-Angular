import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: any) {
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario))
      .subscribe(data => {

        //Retorno http
        var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

        localStorage.setItem("token", token);

        this.router.navigate(['home']);
      },
        error => {
          console.error("Erro ao fazer Login" + error);
        }

      )
  }
}
