import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsermanagementService } from '../../../services/usermanagement.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit {
  leftBannerImgurl = 'assets/images/forgot-password-banner.png';
  VerifyCode!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private kpiservice: UsermanagementService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.VerifyCode = this.formBuilder.group({
      code: ['', Validators.required],
    });
  }
  onSubmit(): void {
    const key = {
      emailOtp: this.VerifyCode.value.code,
      email: localStorage.getItem('verifyEmail'),
    };

    this.kpiservice.verifyOtp(key).subscribe(
      (data) => {
        this.toaster.success('Success');
        this.router.navigate(['/new-password']);
      },
      (error) => {
        this.toaster.error('error', error.error.message);
      }
    );
  }
}
