import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public data: DataService) { }
  handleMenu($event: Event) {
    $event.preventDefault()
    console.log("clicked")
    this.data.toggleSidebar()
    console.log("visible:", this.data.sidebarVisible)
  }
}
