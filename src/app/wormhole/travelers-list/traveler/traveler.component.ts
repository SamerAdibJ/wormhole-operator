import { Component, Input, OnInit, Output } from '@angular/core';
import { scan, Subject, takeWhile, timer } from 'rxjs';
import { AlienRequest } from 'src/app/interface/alien-request';
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
  tripDetails: TripDetails;
  onTrip = false;

  waitingTime: number;
  timeLeft: number;

  @Output() onAssign = new Subject<boolean>()
  @Input() traveler
  @Input() alienRequest: AlienRequest;
  alien: Alien;
  timer: any;

  constructor(private tripService: TripService, private simulator: SimulatorService) { }

  ngOnInit(): void {

    //Removing the trip details after declining the requesting alien
    // this.tripService.removeRequest().subscribe(
    //   request => {
    //     if (request.alien['id'] == this.tripDetails.alienID) {
    //       this.alienRequest = null;
    //     }
    //   }
    // )

    //Subscribing to alien requests
    this.tripService.receiveRequest().subscribe(
      (alienRequest) => {

        this.tripDetails = this.tripService.getTripDetails(alienRequest, this.traveler);
        this.request = true;
        this.alienRequest = alienRequest;
      }
    );
  }

  accept() {
    this.onTrip = true;
    this.onAssign.next(false);
    this.request = false;
    console.log(this.alienRequest);
    console.log(this.traveler);
    console.log(this.tripDetails);



    this.waitingTime=this.tripDetails.waitingTime;

    this.timer = timer(0, 1000).pipe(
      scan(acc => --acc, this.waitingTime),
      takeWhile(x => x >= 0)
    ).subscribe(timeleft => {
      this.timeLeft = timeleft;
      if(this.timeLeft == 0) {
        //Start the tip
        // this.tripService.startTip(this.tripDetails
        console.log(this.alienRequest);
        this.simulator.getAlienById(this.tripDetails.alienID)
      }
    })

    // this.simulator.removeAlien()
  }

}
