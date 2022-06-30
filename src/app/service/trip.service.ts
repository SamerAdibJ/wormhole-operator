import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlienRequest } from '../interface/alien-request';
import { Trip } from '../interface/trip';
import { TripDetails } from '../interface/trip-details';
import { Traveler } from '../wormhole/travelers-list/traveler/traveler.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  acceptRequest = new Subject<AlienRequest>()
  declineRequest = new Subject<AlienRequest>()
  highlightedRequest = new Subject<AlienRequest>()

  trip = new Subject<Trip>()
  endedTrip = new Subject<Trip>()

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

  getTripDetails(alienRequest: AlienRequest, traveler: Traveler): TripDetails {
    return this.calculateTripDetails(alienRequest, traveler);
  }

  highlightRequest(alienRequest: AlienRequest): void {
    this.highlightedRequest.next(alienRequest);
  }

  startTrip(trip: Trip) {
    return this.trip.next(trip);
  }

  endTrip(trip: Trip) {
    return this.endedTrip.next(trip);
  }


  private calculateTripDetails(request, traveler): TripDetails {
    let alienPosition = request.alien.currentPosition;
    let travelerPosition = traveler.currentPosition;
    let destination = request.destination;
    return {
      alienID: request.alien.id,
      waitingTime: this.calculateWaitingTime(alienPosition, travelerPosition),
      destination: destination,
      duration: this.calculateWaitingTime(alienPosition, destination),
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
