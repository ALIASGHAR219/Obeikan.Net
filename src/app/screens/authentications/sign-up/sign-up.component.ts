import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  leftBannerImgurl = 'assets/images/signup-banner.png';
  SignupForm!: FormGroup;
  returnUrl!: string;
  activityDomain!: string;
  constructor(
    private userService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.SignupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      domainActivity: ['', Validators.required],
      groupSize: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
      secondEmail: ['', [Validators.required, Validators.email]],
      enterpriseGroup: ['', [Validators.required]],
    });
    // tslint:disable-next-line:no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(): void {
    const key = {
      firstName: this.SignupForm.value.firstName,
      lastName: this.SignupForm.value.lastName,
      email: this.SignupForm.value.emailAddress,
      secondEmail: this.SignupForm.value.secondEmail,
      groupSize: this.SignupForm.value.groupSize,
      enterpriseGroup: this.SignupForm.value.enterpriseGroup,
      phoneNumber: this.SignupForm.value.phoneNumber,
      domainActivity: this.SignupForm.value.domainActivity,
    };

    if (key.email !== key.secondEmail) {
      this.toaster.warning('Warning', 'Emails are not same');
    } else {
      this.userService.signUp(key).subscribe(
        (data: any) => {
          this.toaster.success('SignUp Successful');
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.toaster.error('Error', error.error.message);
        }
      );
    }
  }
}
