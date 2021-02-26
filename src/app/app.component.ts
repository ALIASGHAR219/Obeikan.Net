import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationCancel, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Obeikan Client';
  isLoading  = false;
  showContent = false;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.showContent = true;
      }
    });
  }
}
