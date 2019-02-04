import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(public router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  refreshUser(): Boolean {
    if ( JSON.parse(sessionStorage.getItem('user')) !== null ) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    return true;
  }
}
