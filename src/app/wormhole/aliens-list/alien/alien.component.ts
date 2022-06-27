import { Component, Input, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {

  }
}
