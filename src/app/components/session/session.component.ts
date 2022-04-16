import { Component, Input, OnInit } from '@angular/core';
import { Session, Reservation } from './../../models/Session';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  @Input() id = '';

  session: Session = {
    owner: 'Daedelus',
    reservations: [
      {
        name: "Tomm",
        id:" asdasd",
        itemId: 12345678,
        modifiedAt: 1650127022,
      } as Reservation,
      {
        name: "Adam",
        id:" asdasd",
        itemId: 3123133,
        modifiedAt: 1650127022,
      } as Reservation,
      {
        name: "James",
        id:" asdasd",
        itemId: 2234344,
        modifiedAt: 1650127022,
      } as Reservation,
    ],
    createdAt: 1650127022,
    description: 'Tempest Keep'
  }

  constructor() {
    //this.id$.pipe
  }

  ngOnInit(): void {
  }

  deleteReservation(id:string) {
    console.log(`Delete reservation ${id}`);
  }
}