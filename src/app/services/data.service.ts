import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  sidebarVisible = false

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible
  }
}
