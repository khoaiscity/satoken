import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase,
  HttpHeaders
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { mergeMap, catchError } from "rxjs/operators";
import { NzMessageService, NzNotificationService } from "ng-zorro-antd";
import { _HttpClient } from "@delon/theme";
import { environment } from "@env/environment";
import { DA_SERVICE_TOKEN, ITokenService } from "@delon/auth";

const CODEMESSAGE = {
  200: "The server successfully returned the requested data. ",
  201: "New or modified data is successful. ",
  202: "A request has entered the background queue (asynchronous task). ",
  204: "Delete data successfully. ",
  400: "The request was sent with an error. The server did not perform any operations to create or modify data. ",
  401: "The user does not have permission (token, username, password is incorrect). ",
  403: "User is authorized, but access is forbidden. ",
  404: "The request sent is for a record that does not exist and the server is not operating. ",
  406: "The format of the request is not available. ",
  410: "The requested resource is permanently deleted and will not be obtained again. ",
  422: "When creating an object, a validation error occurred. ",
  500: "The server has an error. Please check the server. ",
  502: "Gateway error. ",
  503: "The service is unavailable, the server is temporarily overloaded or maintained. ",
  504: "The gateway timed out. "
};

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase) {
    if (ev.status >= 200 && ev.status < 300) return;

    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    this.injector
      .get(NzNotificationService)
      .error(`Request error ${ev.status}: ${ev.url}`, errortext);
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    if (ev.status > 0) {
      this.injector.get(_HttpClient).end();
    }
    this.checkStatus(ev);
    switch (ev.status) {
      case 200:
        // Your code
        // if (event instanceof HttpResponse) {
        //     const body: any = event.body;
        //     if (body && body.status !== 0) {
        //         this.msg.error(body.msg);
        //         // this.http.get('/').subscribe()
        //         return throwError({});
        //     } else {
        //         return of(new HttpResponse(Object.assign(event, { body: body.response })));
        //         return of(event);
        //     }
        // }
        break;
      case 401:
        (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
        this.goTo("/user/login");
        break;
      case 403:
      case 404:
      case 500:
        this.goTo(`/exception/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn(
            "I dont know the error, most of it is caused by the backend not supporting CORS or invalid configuration.",
            ev
          );
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url = req.url;

    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      url = environment.SERVER_URL + url;
    }

    const newReq = req.clone({
      url
    });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponseBase) return this.handleData(event);
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleData(err);
      })
    );
  }
}
