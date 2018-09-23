import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from './alert.service';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

@Injectable({
  providedIn: 'root'
})

export class HttpService extends HttpClient {

  constructor(private httpHandler: HttpHandler, private translate: TranslateService, private alertService: AlertService) {
    super(httpHandler);
  }


  doGet(endPoint: string, options?: IRequestOptions) {
    return super.get(endPoint, options)
      .pipe(
        catchError(this.onCatch),
        tap((res: Response) => {
          return this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  doPost(endPoint: string, params: Object, options?: IRequestOptions) {
    return super.post(endPoint, params,
      this.requestOptions(options))
      .pipe(
        catchError(this.onCatch),
        tap(
          (res: Response) => {
            return this.onSuccess(res);
          }, (error: any) => {
            this.onError(error);
          }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  doPut(endPoint: string, params: Object, options?: IRequestOptions){
    return super.put(endPoint, params, options)
      .pipe(
        catchError(this.onCatch),
        tap(
          (res: Response) => {
            return this.onSuccess(res);
          }, (error: any) => {
            this.onError(error);
          }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  private requestOptions(option?: any) {
    if (option) {
      return option;
    }
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    const options = {
      headers: httpHeaders
    };
    return options;
  }


  private onCatch(error: any) {
    return Observable.throw(error);
  }

  private onSuccess(res: Response) {
    const body = res;
    console.log('Request successful!');
    return body;
  }

  private onEnd(): void {
    console.log('Make anything on request ends!')
  }

  public onError(res: Response): void {
    this.alertService.openAlert('error', 'alerts.error_title', 'alerts.server_error');
  }
}
