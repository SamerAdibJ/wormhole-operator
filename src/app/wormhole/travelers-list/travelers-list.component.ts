import { Component, OnInit } from '@angular/core';
import { AlienRequest } from 'src/app/interface/alien-request';
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

  constructor(private dataService: DataService, private tripservice: TripService) { }

  ngOnInit(): void {
    this.dataService.getTravelers().subscribe(
      travelersData => {
        this.Travelers = travelersData;
    })
  }

}
