import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aliens-list',
  templateUrl: './aliens-list.component.html',
  styleUrls: ['./aliens-list.component.scss']
})
export class AliensListComponent implements OnInit {

  items = [1,2,3,4,5,6,7,8,9];
  constructor() { }

  ngOnInit(): void {
  }

}
