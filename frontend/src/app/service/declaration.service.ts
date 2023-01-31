import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { purchaseModel } from '../pages/purchase/models/purchase.model';
import { BaseService } from '../shared/services/base.service';
import { providerModel } from '../pages/provider/models/provider.model';
import { ventasModel } from '../pages/ventas/models/ventas.model';
import { ventassModel } from '../admin/ventas/models/ventass.model';
// import { purchaseModel } from '../admin/purchase/models/purchase.model';
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

 
  countryList(): Observable<any> {
    const Url = `${environment.apiKEY}countryList`;
    return this.http.get<any>(Url);
  }
  getStates(): Observable<any> {
    const Url = `${environment.apiKEY}getStates`;
    return this.http.get<any>(Url);
  }

  getDeclareData(): Observable<any> {
    const Url = `${environment.apiKEY}getProveedors`;
    return this.http.get<any>(Url);
  }  

  getProveedorsById(id: any): Observable<any> {
    const Url = `${environment.apiKEY}getProveedorsById?id=${id}`;
    return this.http.get<any>(Url);
  }

  saveDeclareData(data: providerModel): Observable<any> {
    const Url = `${environment.apiKEY}addProveedors`;
    return this.http.post<providerModel>(Url, data).pipe(catchError(this.errorHandle));
  }

  editProveedors(data: providerModel): Observable<any> {
    const Url = `${environment.apiKEY}editProveedors?id=` + data.id;;
    return this.http.post<providerModel>(Url, data).pipe(catchError(this.errorHandle));
  }

  deleteProveedors(data: any): Observable<any> {
    const Url = `${environment.apiKEY}deleteProveedors`;
    return this.http.post<any>(Url, data);
  }

  getPurchase(): Observable<any> {
    const Url = `${environment.apiKEY}getPurchase`;
    return this.http.get<any>(Url);
  }

  getPurchaseById(id: any): Observable<any> {
    const Url = `${environment.apiKEY}getPurchaseById?id=${id}`;
    return this.http.get<any>(Url);
  }

  addPurchase(data: purchaseModel): Observable<any> {
    const Url = `${environment.apiKEY}addPurchase`;
    return this.http.post<purchaseModel>(Url, data, this.httpOptions).pipe(catchError(this.errorHandle));
  }

  updatePurchase(data: purchaseModel): Observable<any> {
    const Url = `${environment.apiKEY}editPurchase?id=` + data.id;
    return this.http.post<purchaseModel>(Url, data, this.httpOptions).pipe(catchError(this.errorHandle));
  }

  deletePurchase(data: any): Observable<any> {
    const Url = `${environment.apiKEY}deletePurchase`;
    return this.http.post<any>(Url, data);
  }


  getVentasById(id: any): Observable<any> {
    const Url = `${environment.apiKEY}getVentasById?id=${id}`;
    return this.http.get<any>(Url);
  }


  addVentas(data: ventasModel): Observable<any> {
    const Url = `${environment.apiKEY}addVentas`;
    return this.http.post<ventasModel>(Url, data, this.httpOptions).pipe(catchError(this.errorHandle));
  }

  updateVentas(data: ventasModel): Observable<any> {
    const Url = `${environment.apiKEY}editVentas?id=` + data.id;
    return this.http.post<ventasModel>(Url, data, this.httpOptions).pipe(catchError(this.errorHandle));
  }

  getVentas(): Observable<any> {
    const Url = `${environment.apiKEY}getVentas`;
    return this.http.get<any>(Url);
  }

  deleteVentas(data: any): Observable<any> {
    const Url = `${environment.apiKEY}deleteVentas`;
    return this.http.post<any>(Url, data);
  }


  errorHandle(error: HttpErrorResponse) {
    console.log('error', error.message);
    return throwError(error || 'server error');
  }
}
