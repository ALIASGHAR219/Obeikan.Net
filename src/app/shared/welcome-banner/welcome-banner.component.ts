import { Component, OnInit, Input } from '@angular/core';
import { WelcomeBanner } from 'src/app/models/uimodels/welcomeBanner';
import { WelcombannerService } from 'src/app/services/welcombanner.service';

@Component({
  selector: 'app-welcome-banner',
  templateUrl: './welcome-banner.component.html',
  styleUrls: ['./welcome-banner.component.scss']
})
export class WelcomeBannerComponent implements OnInit {
  @Input() bgImage!: string;
  welcomeBannerData!: WelcomeBanner;
  constructor(private welcomeBannerService: WelcombannerService) { }

  ngOnInit(): void {
    this.welcomeBannerService.getWelcomeBannerdata().subscribe((data: WelcomeBanner) => {
      this.welcomeBannerData = data;
    });
  }

}
