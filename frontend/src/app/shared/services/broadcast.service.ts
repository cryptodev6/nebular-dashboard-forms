import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { IBroadcastEvent } from '../events/Ibroadcast-event';

export const events = {
  progressStarted: "ProgressStarted",
  progressEnded: "ProgressEnded",
  success:"Success",
  Failed:"Failed",
  Confirm:"Confirm" 
}

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private eventBus: Subject<IBroadcastEvent>;  

  constructor() {
    this.eventBus = new Subject<IBroadcastEvent>();
  }

  public progressStarted(data?: any) {
    this.broadcast(events.progressStarted, data);
  }

  public progressEnded(data?: any) {
    this.broadcast(events.progressEnded, data);
  }

  public success(data?: any) {
    this.broadcast(events.success, data);
  }
  
  public failed(data?: any) {
    this.broadcast(events.Failed, data);
  }

  public confirm(data: any) {
    this.broadcast(events.Confirm, data);
  }  
  
  public broadcast(key: any, data?: any) {
    this.eventBus.next({ key, data });
  }

  public listenEvent(): Observable<IBroadcastEvent> {
    return this.eventBus.asObservable();
  }  

  public on<T>(key: any): Observable<T> {
    return this.eventBus.asObservable().pipe(filter(e=>e.key === key), map(event =><T>event.data));   
  }
}

