import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //verifica se existe o token
    if (localStorage.getItem('token') != null) {
      //adiciona o Bearer ao token
      const token = 'Bearer ' + localStorage.getItem('token');

      //pega o token e adiciona o Authorization
      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      //retorna a sessao
      return next.handle(tokenRequest);

    } else {
      return next.handle(req);
    }
  }
}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },],
})

export class HttpInterceptorModule {

}