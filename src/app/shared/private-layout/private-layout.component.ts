import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent implements OnInit {
  isMenuOpen = false;
  isMobMenuActive = false;
  islogin!: boolean;
  jwtHelper = new JwtHelperService();
  constructor(private router: Router, private authService: AuthenticationService ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    this.islogin = this.loggedIn();
    if (!this.islogin) {
      this.router.navigate(['login']);
    }
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  onMenuTogglerChange(isMenuOpenStatus: boolean): void {
    this.isMenuOpen = isMenuOpenStatus ? false : true;
  }

  // sidebar menu change event function
  onMobMenuChange(isMobMenuOpenStatus: boolean): void {
    this.isMobMenuActive = isMobMenuOpenStatus ? false : true;
  }

  // close sidebar mobile menu layer
  closeMobMenu(): void {
    this.isMobMenuActive = !this.isMobMenuActive;
    this.isMenuOpen = false;
  }

  loggedIn(): any {
    return this.authService.loggedIn();
  }

}
