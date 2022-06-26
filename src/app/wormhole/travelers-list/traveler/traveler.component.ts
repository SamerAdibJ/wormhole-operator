import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.scss']
})
export class TravelerComponent implements OnInit {

  request = false;

  @Input() traveler
  constructor() { }

  ngOnInit(): void {
  }

}
