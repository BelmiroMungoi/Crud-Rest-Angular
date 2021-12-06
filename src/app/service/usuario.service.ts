import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  getUserListPage(page: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + page);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(AppConstants.baseUrl + id);
  }

  deleteUser(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' });
  }

  findUserByName(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseUrl + "nome/" + nome);
  }

  findUserByNamePage(nome: String, page: any): Observable<any> {
    return this.http.get(AppConstants.baseUrl + "nome/" + nome + '/page/' + page);
  }

  saveUser(user: any): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }

  deleteEndereco(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + "removeEndereco/" + id, {responseType: 'text'});
  }

  getProfissaoList(): Observable<any> {
    return this.http.get(AppConstants.baseServer + "profissao/")
  }

  userAuthenticated() {
    if (localStorage.getItem('token') != null &&
      localStorage.getItem('token')?.toString().trim() != null) {
      return true;
    } else {
      return false;
    }
  }
}
