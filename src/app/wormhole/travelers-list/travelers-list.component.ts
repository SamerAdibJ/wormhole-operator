import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Traveler } from './traveler/traveler.model';

@Component({
  selector: 'app-travelers-list',
  templateUrl: './travelers-list.component.html',
  styleUrls: ['./travelers-list.component.scss']
})
export class TravelersListComponent implements OnInit {

  Travelers: Traveler[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTravelers().subscribe(
      travelersData => {
        this.Travelers = travelersData;
    })
  }

}
