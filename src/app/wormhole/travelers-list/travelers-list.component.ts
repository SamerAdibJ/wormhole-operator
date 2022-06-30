import { Component, Input, OnInit } from '@angular/core';
import { AlienRequest } from 'src/app/interface/alien-request';
import { TripDetails } from 'src/app/interface/trip-details';
import { DataService } from 'src/app/service/data.service';
import { TripService } from 'src/app/service/trip.service';
import { Traveler } from './traveler/traveler.model';

@Component({
  selector: 'app-travelers-list',
  templateUrl: './travelers-list.component.html',
  styleUrls: ['./travelers-list.component.scss']
})
export class TravelersListComponent implements OnInit {

  Travelers: Traveler[];
  alienRequest: AlienRequest;

  request = false;
  tripDetails: TripDetails;

  constructor(private dataService: DataService, private tripService: TripService) { }

  ngOnInit(): void {
    this.dataService.getTravelers().subscribe(
      travelersData => {
        this.Travelers = travelersData;
    })

    //Subscribing to alien requests
    this.tripService.receiveRequest().subscribe(
      (alienRequest) => {
        this.request = true;
        this.alienRequest = alienRequest;
      }
    );

  }

  onAssigned(isAssigned: boolean) {
    this.request = isAssigned;
    this.alienRequest = null;
  }

}
