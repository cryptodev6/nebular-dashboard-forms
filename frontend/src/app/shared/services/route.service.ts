import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorResponseMessage } from '../../shared/models/response.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService extends BaseService {
  constructor(private router: Router) {
    super();
  }

  public error(response: ErrorResponseMessage) {
    console.log('error-trace', response);
    this.router.navigate(['/error']);
  }
  public login() {
    this.router.navigate(['/login']);
  }
}
