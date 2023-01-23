import { FormGroup } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { ErrorResponseMessage, SuccessMessageResponse } from '../models/response.model';
import { BroadcastService } from '../services/broadcast.service';
import { RouteService } from '../services/route.service';

@Component({
  template: ''
})
export abstract class BaseComponent implements OnDestroy {
  public progressing: boolean;
  public message: string;
  public errors: any;
  public showErrors: boolean;
  public broadCastSuccess = true;
  public lastResponseMessage: ErrorResponseMessage;
  public actionSubscription: any;

  constructor(public broadCastService: BroadcastService,
    public routeService: RouteService) {
  }

  public startProgress(): void {
    this.progressing = true;
    this.broadCastService.progressStarted();

  }

  public endProgress(): void {
    this.progressing = false;
    this.broadCastService.progressEnded();
  }

  public handleSuccess(data: any, successMessage: SuccessMessageResponse, callBackOnSuccess: Function = null): void {
    let msgSuccess = "";
    if (data && data.successMessage) {
      msgSuccess = data.successMessage;
    }
    this.message = msgSuccess;
    if (callBackOnSuccess !== null) {
      callBackOnSuccess(data);
    }
    this.endProgress();
    if (this.broadCastSuccess) {
      this.broadCastService.success(successMessage);
    }
  }

  public handleErrors(message: ErrorResponseMessage, callBackOnError: Function = null): void {
    this.endProgress();
    if (callBackOnError !== null) {
      callBackOnError(message);
    }
    if (message.status === 400 || message.status === 404) {
      this.broadCastService.failed(message);
    }
    if (message.status === 500 || message.status === 0) {
      this.routeService.error(message);
    }
    if (message.status === 401) {
      this.routeService.login();
    }
  }

  public isValid(form: FormGroup): boolean {
    this.showErrors = false;
    if (!form.valid) {
      this.showErrors = true;
      return false;
    }
    return true;
  }

  public executeAction(action: Function,
    callBackOnSuccess: Function = null,
    callBackOnError: Function = null,
    successMessage: SuccessMessageResponse = { message: "Notifications.DefaultSuccess" }) {
    this.message = "";
    this.startProgress();
    this.actionSubscription = action().subscribe((data: any) =>
      this.handleSuccess(data, successMessage, callBackOnSuccess),
      (data: any) => {
        this.handleErrors(data, callBackOnError);
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
  }

  public broadCastSuccessExecution(message: SuccessMessageResponse) {
    this.broadCastService.success(message);
  }
}
