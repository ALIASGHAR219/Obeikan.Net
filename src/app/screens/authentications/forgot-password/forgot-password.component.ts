import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsermanagementService } from '../../../services/usermanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  leftBannerImgurl = 'assets/images/forgot-password-banner.png';

  ForgotPassword!: FormGroup;
  returnUrl!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private kpiService: UsermanagementService
  ) {}

  ngOnInit(): void {
    this.ForgotPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit(): void {
    const key = {
      email: this.ForgotPassword.value.email,
    };
    localStorage.setItem('verifyEmail', this.ForgotPassword.value.email);
    this.kpiService.forgotPassword(key).subscribe(
      (data) => {
        this.toaster.success('Success', 'Email Sent');
        this.router.navigate(['/verify-code']);
      },
      (error) => {
        this.toaster.error('Error', error.error.message);
      }
    );

    // stop here if form is invalid
    if (this.ForgotPassword.invalid) {
      return;
    }
    console.log(this.ForgotPassword.value);
  }
}
