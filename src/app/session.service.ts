import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Session } from './models/Session';
import { SecretService } from './secret.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  baseUrl = "https://europe-west1-reserveloot-a4576.cloudfunctions.net/app/api";

  constructor(private http: HttpClient, private secret: SecretService) { }

  createSession(name: string, description: string): Observable<string> {
    let body: CreateSessionBody = {
      owner: name,
      description: description,
    }
    let httpOptions = {
      headers: new HttpHeaders({
        secret: this.secret.getSecret()
      })
    };
    let url = this.baseUrl + "/session"
    return this.http.post<CreateSessionResponse>(url, body, httpOptions)
    .pipe(
      map(response => response.id)
    )
  }

  fetchSession(id: string): Observable<Session> {
    let url = this.baseUrl + "/session/" + encodeURIComponent(id)
    return this.http.get<Session>(url)
  }

  reserve(sessionId: string, name: string, itemId: number): Observable<unknown> {
    let body: CreateReservationBody = {
      name: name,
      itemId: itemId,
    }
    let httpOptions = {
      headers: new HttpHeaders({
        secret: this.secret.getSecret()
      })
    };
    let url = this.baseUrl + "/session/" + sessionId + "/reservations"
    return this.http.put(url, body, httpOptions)
  }

  deleteReservation(sessionId: string, reservationId: string): Observable<unknown> {
    let body: DeleteReservationBody = {
      id: reservationId,
    }
    let httpOptions = {
      headers: new HttpHeaders({
        secret: this.secret.getSecret()
      })
    };
    let url = this.baseUrl + "/session/" + sessionId + "/reservations/" + reservationId
    return this.http.delete(url, httpOptions)
  }
}

export interface CreateSessionBody {
  owner: string,
  description: string,
}

export interface CreateSessionResponse {
  id: string
}

export interface CreateReservationBody {
  name: string,
  itemId: number,
}

export interface DeleteReservationBody {
  id: string
}