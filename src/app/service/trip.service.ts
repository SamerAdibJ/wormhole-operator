import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlienRequest } from '../interface/alien-request';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  tripRequest = new Subject<AlienRequest>()
  request: Subscription

  constructor() { }

  submitRequest(alienRequest:AlienRequest)  {
    this.tripRequest.next(alienRequest);
  }


  receiveRequest() {
    return this.tripRequest;
  }
}
