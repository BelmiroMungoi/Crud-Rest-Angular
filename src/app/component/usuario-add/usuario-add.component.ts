import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new Usuario();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getUserById(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  saveUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.userService.updateUser(this.usuario).subscribe(data => {
        this.cancelar();
        console.log("Editando usuario " + data)
      });
    } else {

      this.userService.saveUser(this.usuario).subscribe(data => {
        this.cancelar();
        console.log("Salvando Usuario " + data)
      });
    }
  }

  cancelar() {
    this.usuario = new Usuario();
  }

}
