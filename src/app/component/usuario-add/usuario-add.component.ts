import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Endereco } from 'src/app/model/endereco'
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/profissao';
import { NgForm } from '@angular/forms';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string>{

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      }
    }
    return null;
  }
  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

}

@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {

    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      }
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {

    return date ? validaDate(date.day) + this.DELIMITER + validaDate(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
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
  providers: [{ provide: NgbDateParserFormatter, useClass: FormataData },
  { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class UsuarioAddComponent implements OnInit {

  usuario = new Usuario();

  endereco = new Endereco();

  profissoes!: Array<Profissao>;

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }


  ngOnInit(): void {

    this.userService.getProfissaoList().subscribe(data => {
      this.profissoes = data;
    })

    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id !== null) {
      this.userService.getUserById(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  profissao(): any {
    return (this.usuario.profissao.id) ? this.usuario.profissao : []
  }

  saveUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.userService.updateUser(this.usuario).subscribe(data => {
        this.cancelar();
      });
    } else {

      this.userService.saveUser(this.usuario).subscribe(data => {
        this.cancelar();
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
