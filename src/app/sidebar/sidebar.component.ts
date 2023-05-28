import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// I'm leaving faCoffee as an example. You import the icon
// you want and make a variable for it
// Then you call the variable in html using this: <fa-icon [icon]="faCoffee"></fa-icon>


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  //This is the coffee icon variable
  faXmark = faXmark

  constructor(public data: DataService) { }
  closeSidebar($event: Event) {
    $event.preventDefault()
    console.log("clicked sidebar close")
    this.data.toggleSidebar()
  }
}
