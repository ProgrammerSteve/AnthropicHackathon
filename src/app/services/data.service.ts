import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  sidebarVisible = false
  correct = 0
  attempts = 0

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible
  }
}
