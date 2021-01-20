import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  private static readonly UNAUTHORIZED_STATUS = 401;
  private static readonly UNAUTHORIZED_TEXT = 'Unauthorized';

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {

      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      });
    }

    return next.handle(req)
      .pipe(
        tap(() => {
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              // event equals a response
              // 401 means unauthorized
              if (err.status === BasicAuthHttpInterceptorService.UNAUTHORIZED_STATUS
                && err.statusText === BasicAuthHttpInterceptorService.UNAUTHORIZED_TEXT) {

                sessionStorage.clear();
                this.router.navigate(['login']);
              }
            }
          }
        )
      );
  }
}
