import { Component, Input, OnInit, Output } from '@angular/core';
import { scan, Subject, takeWhile, timer } from 'rxjs';
import { AlienRequest } from 'src/app/interface/alien-request';
import { Trip } from 'src/app/interface/trip';
import { TripDetails } from 'src/app/interface/trip-details';
import { SimulatorService } from 'src/app/service/simulator.service';
import { TripService } from 'src/app/service/trip.service';
import { Alien } from '../../aliens-list/alien/alien.model';

@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.scss']
})
export class TravelerComponent implements OnInit {

  request = false;
  onTrip = false;
  hasAlien = false;

  waitingTime: number;
  timeLeft: number;

  tripDetails: TripDetails;
  assignedAlien: Alien = {};

  trip: Trip;

  @Output() onAssign = new Subject<boolean>()
  @Input() traveler
  @Input() alienRequest: AlienRequest;

  timer: any;

  constructor(private tripService: TripService, private simulator: SimulatorService) { }

  ngOnInit(): void {

    //Subscribing to alien requests
    this.tripService.receiveRequest().subscribe(
      (alienRequest) => {
        this.tripDetails = this.tripService.getTripDetails(alienRequest, this.traveler);
        this.request = true;
        this.alienRequest = alienRequest;
      }
    );

    this.tripService.endedTrip.subscribe(
      trip => {
        if(trip.traveler == this.traveler) {
          this.onTrip = false;
          this.traveler.currentPosition = trip.tripDetails.destination;
          console.log(this.traveler);

        }
      }
    )
  }

  accept() {
    this.onTrip = true;
    this.onAssign.next(false);
    this.request = false;
    this.assignedAlien = this.alienRequest.alien;

    this.trip = {
      alien: this.alienRequest.alien,
      traveler: this.traveler,
      tripDetails: this.tripDetails
    }

    this.simulator.removeAlien(this.alienRequest);

    this.waitingTime=this.tripDetails.waitingTime;
    if(this.waitingTime == 0) {
      this.hasAlien = true;
      this.simulator.getAlienById(this.tripDetails.alienID);
      this.tripService.startTrip(this.trip);
    } else {
      this.timer = timer(0, 1000).pipe(
        scan(acc => --acc, this.waitingTime),
        takeWhile(x => x >= 0)
      ).subscribe(timeleft => {
        this.timeLeft = timeleft;
        if(this.timeLeft == 0) {
          //Start the tip
          this.hasAlien = true;
          this.simulator.getAlienById(this.tripDetails.alienID);
          this.tripService.startTrip(this.trip);
        }
      })
    }
  }

}
