import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WelcombannerService } from 'src/app/services/welcombanner.service';
import { WelcomeBanner } from 'src/app/models/uimodels/welcomeBanner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  leftBannerImgurl = 'assets/images/login-banner.png';
  loginForm!: FormGroup;
  loginmodel!: Login;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    // this.spinner.show();
    this.loginmodel = this.loginForm.value;
    // this.authService.login(this.loginmodel).subscribe(
    //   (user: any) => {
    //     this.toaster.success('Success', 'Login Successfully ');
    localStorage.setItem('user', JSON.stringify('user.user'));
    this.router.navigate(['/home']);
    //     this.spinner.hide();
    //   },
    //   (error: any ) => {
    //     this.toaster.error('Error', error.error.message);
    //     this.spinner.hide();
    //   }
    // );
  }
  resetForm(): void {
    this.loginForm.reset();
  }
}
