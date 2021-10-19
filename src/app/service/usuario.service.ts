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

  deleteUser(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, {responseType: 'text'});
  }
}