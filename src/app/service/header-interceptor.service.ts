import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

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
      return next.handle(tokenRequest).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
          console.info("Sucesso na operacao")
        }
      }),
        catchError(this.processError));

    } else {
      return next.handle(req).pipe(catchError(this.processError));
    }
  }

  constructor() { }

  processError(error: HttpErrorResponse) {
    let errorMessage = 'Erro Desconhecido';

    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.error;
    } else {
      if (error.status == 403) {
        errorMessage = 'Acesso Negado: Faça o login Novamente'
      } else {
        errorMessage = 'Codigo: ' + error.error.code + '\n' + error.error.error;
      }
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
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