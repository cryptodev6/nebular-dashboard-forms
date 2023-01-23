import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { purchaseModel } from '../pages/purchase/models/purchase.model';
import { BaseService } from '../shared/services/base.service';
@Injectable({
  providedIn: 'root',
})
export class DeclarationService extends BaseService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    }),
  };
  constructor(private http: HttpClient) {
    super();
  }

  getDeclareData(): Observable<any> {
    const Url = `${environment.apiKEY}getProveedors`;
    return this.http.get<any>(Url);
  }

  getPurchase(): Observable<any> {
    const Url = `${environment.apiKEY}getPurchase`;
    return this.http.get<any>(Url);
  }

  getProveedorsById(id: any): Observable<any> {
    const Url = `${environment.apiKEY}getProveedorsById?id=${id}`;
    return this.http.get<any>(Url);
  }

  getPurchaseById(id: any): Observable<any> {
    const Url = `${environment.apiKEY}getPurchaseById?id=${id}`;
    return this.http.get<any>(Url);
  }
  countryList(): Observable<any> {
    const Url = `${environment.apiKEY}countryList`;
    return this.http.get<any>(Url);
  }
  getStates(): Observable<any> {
    const Url = `${environment.apiKEY}getStates`;
    return this.http.get<any>(Url);
  }

  saveDeclareData(data: any): Observable<any> {
    const Url = `${environment.apiKEY}addProveedors`;
    return this.http.post<any>(Url, data).pipe(catchError(this.errorHandle));
  }

  editProveedors(data: any): Observable<any> {
    const Url = `${environment.apiKEY}editProveedors`;
    return this.http.post<any>(Url, data).pipe(catchError(this.errorHandle));
  }

  addPurchase(data: purchaseModel): Observable<any> {
    const Url = `${environment.apiKEY}addPurchase`;
    return this.http.post<purchaseModel>(Url, data, this.httpOptions).pipe(catchError(this.errorHandle));
  }

  updatePurchase(data: purchaseModel): Observable<any> {
    const Url = `${environment.apiKEY}editPurchase?id=` + data.id;
    return this.http.post<purchaseModel>(Url, data, this.httpOptions).pipe(catchError(this.errorHandle));
  }

  deleteProveedors(data: any): Observable<any> {
    const Url = `${environment.apiKEY}deleteProveedors`;
    return this.http.post<any>(Url, data);
  }

  deletePurchase(data: any): Observable<any> {
    const Url = `${environment.apiKEY}deletePurchase`;
    return this.http.post<any>(Url, data);
  }

  errorHandle(error: HttpErrorResponse) {
    console.log('error', error.message);
    return throwError(error || 'server error');
  }
}
