import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = { userName: '', passWord: '' };

  constructor(private loginService: LoginService) { }

  public login() {
    this.loginService.login(this.usuario)
  }

    ngOnInit(): void {
  }

}
