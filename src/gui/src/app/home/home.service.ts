import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Reservation} from "./reservation";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class HomeService {
  reservationUrl = 'http://localhost:8082/api/schedules/schedule';

  constructor(private http: HttpClient) {
  }

  getReservations(user: string, days: number) :Observable<Reservation[]> {
    let headers: HttpHeaders = new HttpHeaders({
      "Authorization": "Basic " + sessionStorage.getItem('token')
    });
    const options  = {params: new HttpParams().set('username', user).set('interval', days.toString()), headers: headers};
    return this.http.get<Reservation[]>(this.reservationUrl, options)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }
ng
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
