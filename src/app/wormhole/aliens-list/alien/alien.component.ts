import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alien',
  templateUrl: './alien.component.html',
  styleUrls: ['./alien.component.scss']
})
export class AlienComponent implements OnInit {
  panelOpenState = false;
  request = true;
  item;
  constructor() { }

  ngOnInit(): void {
  }
}
