import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReserveLootAngular';
  constructor(private router: Router) {
  }

  hasAnyRoute(): boolean {
    return this.router.url.length > 1;
  }
}
