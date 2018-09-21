import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {

  constructor(private httpHandler: HttpHandler, private translate: TranslateService, private alertService: AlertService) {
    super(httpHandler);
  }


  doGet(url: string) {
    debugger;
    return super.get(url)
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

  doPost(url: string, body: any) {
    return super.post(url, body,
      this.requestOptions())
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

  private requestOptions() {
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
    const body = res.json();
    console.log('Request successful!');
    return body;
  }

  private onEnd(): void {
    console.log('Make anithing on request ends!')
  }

  public onError(res: Response): void {
    console.log('Error, status code: ' + res.status);
    let title;
    let message;
    this.translate.get('shared.alert.access_denied').subscribe(data => title = data);
    if (res.status === 401) {
      this.translate.get('shared.alert.invalid_grant').subscribe(data => message = data);
      this.alertService.openAlert('warn', title, message);
    } else if (res.status === 403) {
      this.translate.get('shared.alert.unknow_grant').subscribe(data => message = data);
      this.alertService.openAlert('warn', title, message);
    }
  }
}
