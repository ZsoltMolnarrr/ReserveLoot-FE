import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  joinId = "";
  name = "";
  description = "";

  constructor(private service: SessionService, private router: Router) {
  }

  ngOnInit(): void {
    console.log("HomeComponent init");
  }

  onStart(): void {
    this.service
      .createSession(this.name, this.description)
      .subscribe(id => this.loadSession(id));
  }

  loadSession(id: string): void {
    this.router.navigate([`session/${id}`])
  }
}
