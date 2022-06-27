import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alien',
  templateUrl: './alien.component.html',
  styleUrls: ['./alien.component.scss']
})
export class AlienComponent implements OnInit {
  panelOpenState = false;

  request = false;

  @Input() alien;


  constructor() { }

  ngOnInit(): void {

    if(this.alien.id == '1' || this.alien.id == '5' || this.alien.id == '7') {
      this.request = true;
    }
  }
}
