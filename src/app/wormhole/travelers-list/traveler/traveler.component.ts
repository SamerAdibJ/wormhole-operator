import { Component, Input, OnInit } from '@angular/core';
import { TripDetails } from 'src/app/interface/trip-details';
import { TripService } from 'src/app/service/trip.service';

@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.scss']
})
export class TravelerComponent implements OnInit {

  request = false;
  tripDetails: TripDetails;

  @Input() traveler
  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    //Subscribing to alien requests
    this.tripService.receiveRequest().subscribe(
      (alienRequest) => {
        this.request = true;
        this.tripDetails = this.tripService.getTripDetails(alienRequest, this.traveler)
      }
    );

    //Removing the trip details after declining the requesting alien
    this.tripService.removeRequest().subscribe(
      request => {
        if (request.alien['id'] == this.tripDetails.alienID) {
          this.request = false;
        }
      }
    )
  }

  accept() {

  }

}
