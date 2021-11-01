import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Endereco } from 'src/app/model/endereco' 

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new Usuario();

  endereco = new Endereco();

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

  addEndereco() {

    if (this.usuario.enderecos === undefined) {
      this.usuario.enderecos = new Array<Endereco>();
    }

    this.usuario.enderecos.push(this.endereco);
    this.endereco = new Endereco();
  }

  deletarEndereco(id: any, i: any) {

    if (id == null) {
      this.usuario.enderecos.splice(i, 1);
      return;
    }

    if (id != null && confirm("Deseja Remover?")) {
      this.userService.deleteEndereco(id).subscribe(data => {
        this.usuario.enderecos.splice(i, 1);
        console.info("Endereco Removido " + data);
      })
    }
  }

  cancelar() {
    this.usuario = new Usuario();
    this.endereco = new Endereco();
  }

}
