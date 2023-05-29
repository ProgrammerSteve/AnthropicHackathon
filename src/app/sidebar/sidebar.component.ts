import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(public data: DataService) { }
  closeSidebar($event: Event) {
    $event.preventDefault()
    console.log("clicked sidebar close")
    this.data.toggleSidebar()
  }
}
