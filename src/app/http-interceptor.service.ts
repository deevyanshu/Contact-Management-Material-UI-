import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private userService:ContactService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.userService.isUserLoggedIn() && req.url.indexOf('auth')===-1)
    {
      const authreq=req.clone({
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        })
    });
    return next.handle(authreq);
    }else{
      return next.handle(req);
    }
  }
}
