import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginUser } from 'src/app/models/loginUser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isMobMenuActive = false;
  @Output() menuChangeEvent = new EventEmitter();
  isMenuOpen = true;

  user!: LoginUser;
  constructor() { }

  ngOnInit(): void {
    const u = localStorage.getItem('user');
    this.user = u !== null ? JSON.parse(u) : {};
  }

  menuToggler(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuChangeEvent.emit(this.isMenuOpen);
  }

}
