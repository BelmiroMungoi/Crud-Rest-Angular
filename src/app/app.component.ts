import { Component } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crud-Rest-Angular';

  usuario = { userName: '', passWord: '' };

  constructor(private loginService: LoginService) { }

  public login() {
    this.loginService.login(this.usuario)
  }
}
