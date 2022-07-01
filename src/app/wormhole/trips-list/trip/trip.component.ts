import { Component, Input, OnInit } from '@angular/core';
import { scan, Subject, takeWhile, timer } from 'rxjs';
import { Trip } from 'src/app/interface/trip';
import { SimulatorService } from 'src/app/service/simulator.service';
import { TripService } from 'src/app/service/trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Input() trip: Trip;
  tripDuration: number;

  timer: any;
  timeLeft: number;

  constructor(private simulator: SimulatorService, private tripService: TripService) { }

  ngOnInit(): void {
    this.tripDuration = this.trip['duration'];

    if(this.tripDuration == 0) {
      this.trip.alien['currentPosition'] = this.trip.tripDetails['destination'];

      this.simulator.reloadAlien(this.trip.alien);

    } else {
      this.timer = timer(0, 1000).pipe(
        scan(acc => --acc, this.trip.tripDetails['duration']),
        takeWhile(x => x >= 0)
      ).subscribe(timeleft => {
        this.timeLeft = timeleft;
        if(this.timeLeft == 0) {
          //End the tip
          this.trip.alien['currentPosition'] = this.trip.tripDetails['destination'];

          this.simulator.reloadAlien(this.trip.alien);
          this.tripService.endTrip(this.trip);
        }
      })
    }
  }



}
