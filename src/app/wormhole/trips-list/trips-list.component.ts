import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/interface/trip';
import { TripService } from 'src/app/service/trip.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {

  trips: Trip[] = [];

  constructor(private tripService: TripService) { }

  ngOnInit(): void {

    this.tripService.trip.subscribe(
      trip => {
        this.trips.push(trip);
      }
    )

    this.tripService.endedTrip.subscribe(
      endedTrip => {
        this.trips = this.trips.filter(
          trip => {
            return trip.tripDetails != endedTrip.tripDetails;
          }
        )
      }
    )
  }

}
