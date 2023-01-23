import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ErrorResponseMessage } from "../../shared/models/response.model";

@Injectable({
  providedIn: "root",
})
export class BaseService {
  protected httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
  };

  public handleError(httpErrorResponse: HttpErrorResponse): Observable<any> {
    if (httpErrorResponse instanceof ErrorEvent) {
      return throwError(httpErrorResponse);
    } else {
      var responseMessage = httpErrorResponse.error as ErrorResponseMessage;
      if (responseMessage) {
        responseMessage.status = httpErrorResponse.status;
        console.log('error: ', responseMessage.errors);
        return throwError(responseMessage);
      }
      console.log('error: ', httpErrorResponse);
      return throwError(httpErrorResponse);
    }
  }


  protected getHttpOptionsEx(contentType = "application/json", headers = null, responseType = null) {
    let tmpHeaders = headers ? new HttpHeaders(headers) : new HttpHeaders();
    const token = localStorage.getItem("ayushita-token");
    if (token) {
      tmpHeaders = tmpHeaders.append("Authorization", `Bearer ` + token);
    }

    if (contentType) {
      tmpHeaders = tmpHeaders.append("Content-Type", contentType);
    }

    const httpOptions = {
      headers: tmpHeaders,
    };

    if (responseType) {
      httpOptions["responseType"] = responseType;
    }
    return httpOptions;
  }
}
