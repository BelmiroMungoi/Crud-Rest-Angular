import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = { userName: '', passWord: '' };

  constructor(private loginService: LoginService, private router: Router) { }

  public login() {
    this.loginService.login(this.usuario)
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null &&
      localStorage.getItem('token')?.toString().trim()) {
        this.router.navigate(['home']);
    }
  }

}
