import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public _opened: boolean = false;
 
  public _toggleSidebar() {
    this._opened = !this._opened;
    console.log(this._opened);
  }
  Name= "Daniela Andrea";
  LastName = "Torres Gómez";
  Role="Usuario";

}
