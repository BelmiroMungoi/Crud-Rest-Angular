import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Endereco } from 'src/app/model/endereco'
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMETER = '/';

  parse(value: string): NgbDateStruct | null {

    if (value) {
      let date = value.split(this.DELIMETER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      }
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {

    return date ? validaDate(date.day) + this.DELIMETER + validaDate(date.month) + this.DELIMETER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null{
    return date ? date.day + this.DELIMETER + date.month + this.DELIMETER + date.year : null;
  }
}

function validaDate(valor: any) {
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  } else {
    return valor;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormataData }]
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
