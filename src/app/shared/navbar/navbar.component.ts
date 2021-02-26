import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/loginUser';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  @Input() isMenuOpen!: boolean;
  @Output() mobMenuTogglerEvent = new EventEmitter();
  searchForm!: FormGroup;
  notifcationCount = 2;
  isSarchFormVisible = false;
  userImage!: any;
  user!: LoginUser;
  constructor(private router: Router, private formBuilder: FormBuilder,
              private authService: AuthenticationService, private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: ['', Validators.required],
    });
    const u = localStorage.getItem('user');
    this.user = u !== null ? JSON.parse(u) : {};
    this.userImage = JSON.parse(localStorage.user).imagePath;
  }
  onSubmit(): void {
    const searchValue = this.searchForm.value;
    console.log('searchValue ::', searchValue);
  }
  mobMenuToggler(): void {
    this.mobMenuTogglerEvent.emit(this.isMenuOpen);
  }

  toggleSearchForm(): void {
    this.isSarchFormVisible = !this.isSarchFormVisible;
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.toaster.info('logged out');
    this.router.navigate(['/login']);
  }
}
