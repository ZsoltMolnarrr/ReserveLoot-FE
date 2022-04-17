import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  url = ""

  session: Session = {
    owner: '',
    reservations: [],
    createdAt: 1650127022,
    description: ''
  }

  constructor(
    private router: Router, 
    private activeRoute: ActivatedRoute, 
    private service: SessionService) {
  }

  ngOnInit(): void {
    this.name = localStorage.getItem("lastUsedName") ?? "";
    this.sessionId = this.activeRoute.snapshot.paramMap.get('id')!;
    this.refresh().subscribe();
  }

  refresh(): Observable<never> {
    return this.service.fetchSession(this.sessionId).pipe(
      tap(session => this.onSessionUpdate(session)),
      ignoreElements()
    )    
  }

  onSessionUpdate(session: Session) {
    this.session = session;
    this.url = window.location.origin + this.router.url;
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

  onReservationAdded() {
    if (this.name != "") {
      localStorage.setItem("lastUsedName", this.name)
    }
    this.refresh().subscribe()
  }
}