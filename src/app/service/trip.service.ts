import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlienRequest } from '../interface/alien-request';
import { TripDetails } from '../interface/trip-details';
import { Traveler } from '../wormhole/travelers-list/traveler/traveler.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  acceptRequest = new Subject<AlienRequest>()
  declineRequest = new Subject<AlienRequest>()
  highlightedRequest = new Subject<AlienRequest>()
  request: Subscription

  constructor() { }

  submitRequest(request:AlienRequest)  {
    this.acceptRequest.next(request);
  }

  receiveRequest() {
    return this.acceptRequest;
  }

  cancelRequest(request: AlienRequest) {
    return this.declineRequest.next(request);
  }

  removeRequest() {
    return this.declineRequest;
  }

  getTripDetails(alienRequest: AlienRequest, traveler: Traveler): TripDetails {
    return this.calculateTripDetails(alienRequest, traveler);
  }

  highlightRequest(alienRequest: AlienRequest): void {
    this.highlightedRequest.next(alienRequest);
  }

  private calculateTripDetails(request, traveler): TripDetails {
    let alienPosition = request.alien.currentPosition;
    let travelerPosition = traveler.currentPosition;
    let destination = request.destination;
    return {
      alienID: request.alien.id,
      cost: this.calculateCost(alienPosition, travelerPosition),
      waitingTime: this.calculateWaitingTime(alienPosition, travelerPosition),
      totalDuration: this.calculateTotalDuration(alienPosition, travelerPosition, destination),
      totalDistance: this.calculateTotalDistance(alienPosition, travelerPosition, destination)
    }
  }

  private calculateCost(a, b): number {
    return this.calculateDistance(a, b)* 1.5;
  }

  private calculateDistance(a: number, b: number) {
    return Math.abs(a-b);
  }

  private calculateTotalDistance(a: number, b: number, c: number) {
    return this.calculateDistance(a, b) + this.calculateDistance(a, c);
  }

  private calculateWaitingTime(a: number, b: number) {
    return Math.floor(this.calculateDistance(a, b)*2/3);
  }

  private calculateTotalDuration(a: number, b: number, c: number) {
    return this.calculateWaitingTime(a, b) + this.calculateWaitingTime(a, c);
  }

}
