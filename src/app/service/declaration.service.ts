import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DeclarationService {
  constructor(private http: HttpClient) {}

  getDeclareData(): Observable<any> {
    const Url = `${environment.apiKEY}declareData`;
    return this.http.get<any>(Url).pipe(catchError(this.errorHandle));
  }

  saveDeclareData(data: any): Observable<any> {
    const Url = `${environment.apiKEY}saveDeclareData`;
    return this.http.post<any>(Url, data).pipe(catchError(this.errorHandle));
  }

  errorHandle(error: HttpErrorResponse) {
    console.log('error', error.message);
    return throwError(error || 'server error');
  }
}
