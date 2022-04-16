import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Session } from './models/Session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // currentSession: Session?;

  baseUrl = "https://europe-west1-reserveloot-a4576.cloudfunctions.net/app/api";

  constructor(private http: HttpClient) { }

  createSession(name: string, description: string): Observable<string> {
    let body: CreateSessionBody = {
      owner: name,
      description: description,
    }
    let httpOptions = {
      headers: new HttpHeaders({
        secret: 'my-client-secret'
      })
    };
    let url = this.baseUrl + "/session"
    return this.http.post<CreateSessionResponse>(url, body, httpOptions)
    .pipe(
      map(response => response.id)
    )
  }

  loadSession(id: string): Observable<Session> {
    let url = this.baseUrl + "/session/" + encodeURIComponent(id)
    return this.http.get<Session>(url)
  }
}

export interface CreateSessionBody {
  owner: string,
  description: string,
}

export interface CreateSessionResponse {
  id:string
}