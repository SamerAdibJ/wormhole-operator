import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AlienRequest } from 'src/app/interface/alien-request';
import { TripService } from 'src/app/service/trip.service';
import { Alien } from './alien.model';

@Component({
  selector: 'app-alien',
  templateUrl: './alien.component.html',
  styleUrls: ['./alien.component.scss']
})
export class AlienComponent implements OnInit {
  panelOpenState = false;
  alienIconUrl = '../../../../assets/icons/alien.svg';
  request = false;

  @Input() alienRequest;



  constructor(private tripService: TripService) { }

  ngOnInit(): void {

  }

  accept() {
    this.tripService.submitRequest(this.alienRequest);
  }
}
