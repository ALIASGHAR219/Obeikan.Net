import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsermanagementService } from '../../../services/usermanagement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  Password!: FormGroup;
  leftBannerImgurl = 'assets/images/forgot-password-banner.png';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private kpiService: UsermanagementService
  ) {}

  ngOnInit(): void {
    this.Password = this.formBuilder.group({
      password: ['', Validators.required],
      retypepassword: ['', Validators.required],
    });
  }
  onSubmit(): void {
    const key = {
      password: this.Password.value.password,
      retype: this.Password.value.retypepassword,
      email: localStorage.getItem('verifyEmail'),
    };
    if (key.retype !== key.password) {
      this.toaster.warning('Please make sure both passwords are same');
    } else {
      this.kpiService.updatePassword(key).subscribe(
        (data) => {
          this.toaster.success('Success', 'Password saved');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toaster.error('error', error.error.message);
        }
      );
    }
  }
}
