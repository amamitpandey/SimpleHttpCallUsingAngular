import { Injectable } from '@angular/core';
import { Observable, timer, of, Subscriber, range, concat, throwError, pipe } from 'rxjs';
import { concatMap, flatMap, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    ) { }


  // for basic httpPost using observable
  httpBasicGet(url, isLoaderNeeded): Observable<any> {
    // setting header
    let varHeader = {}
    varHeader = {
      //'access-token': ''
    }
    // for getting body and header, need to response as obserble {observe: 'response'}
    //loader start
    if (isLoaderNeeded) {
      this.loaderService.show();
    }
    return this.http.get<any>(url, { headers: varHeader, observe: 'response' }).pipe(tap(data => {
      if (isLoaderNeeded) {
        this.loaderService.hide()
      }
      console.log("http_data", data)
    }), catchError((err: HttpErrorResponse) => {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`

        if (err.status == 401) {
          //this.toastService.presentToast(err.error.errors[0])
        } else if (err.status == 404) {
          console.log("Http_res_err404", err)
          //this.toastService.presentToast(err.error.message)
        } else if (err.status == 403) {
          //this.toastService.presentToast(err.error.errors.full_messages[0])
        } else if (err.status == 422) {
          //this.toastService.presentToast(err.error.errors[0])
        } else {
          //this.toastService.presentToast("Something went wrong!")
        }
        //loader end
        if (isLoaderNeeded) {
          this.loaderService.hide()
        }
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }))
  }
}
