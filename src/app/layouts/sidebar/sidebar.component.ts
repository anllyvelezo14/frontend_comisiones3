import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public _opened: boolean = false;

  constructor(private authenticationService: AuthService) {}

  ngOnInit(): void {}

  public _toggleSidebar() {
    this._opened = !this._opened;
    // console.log(this._opened);
  }

  Name = 'Daniela Andrea';
  LastName = 'Torres Gómez';
  Role = 'Usuario';

  onLogout(): void {
    this.authenticationService.logout();
  }
}
