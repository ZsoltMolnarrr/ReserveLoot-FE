import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, concat, ignoreElements, map, Observable, Subscription, tap } from 'rxjs';
import { SessionService } from 'src/app/session.service';
import { Session, Reservation } from './../../models/Session';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  sessionId = "";
  name = "";
  itemToReserve: number = 0;

  session: Session = {
    owner: '',
    reservations: [],
    createdAt: 1650127022,
    description: ''
  }

  constructor(private route: ActivatedRoute, private service: SessionService) {
  }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('id')!;
    this.refresh().subscribe();
  }

  refresh(): Observable<never> {
    return this.service.fetchSession(this.sessionId).pipe(
      tap(session => this.session = session),
      ignoreElements()
    )    
  }

  deleteReservation(id:string) {
    this.service.deleteReservation(this.sessionId,id)
      .subscribe(unknown => this.refresh().subscribe())
  }

  addReservation() {
    if (this.itemToReserve == 0) {
      return;
    }
    this.service.reserve(this.sessionId, this.name, this.itemToReserve)
      .subscribe(unknown => this.refresh().subscribe())
  }
}