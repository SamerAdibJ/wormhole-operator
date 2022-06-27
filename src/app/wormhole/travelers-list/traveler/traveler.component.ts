import { Component, Input, OnInit } from '@angular/core';
import { TripService } from 'src/app/service/trip.service';

@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.scss']
})
export class TravelerComponent implements OnInit {

  request = false;
  alienRequest ;
  @Input() traveler
  constructor(private tripService: TripService) { }

  ngOnInit(): void {

    this.tripService.receiveRequest().subscribe(
      (request) => {
        this.request = true;
        this.alienRequest = request;
      }
    );
  }

  accept() {

  }

}
