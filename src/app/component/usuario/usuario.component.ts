import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios!: Usuario[];
  nome!: string;
  total!: number;
  p!: any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUserList().subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }

  findUser(): void {
    this.usuarioService.findUserByName(this.nome).subscribe(data => {
      this.usuarios = data;
    });
  }

  deleteUser(id: Number) {
    this.usuarioService.deleteUser(id).subscribe(data => {
      this.usuarioService.getUserList().subscribe(data => {
        this.usuarios = data;
      });
    });
  }

  loadPage(pag: any){
    this.usuarioService.getUserListPage(pag - 1).subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }



}
