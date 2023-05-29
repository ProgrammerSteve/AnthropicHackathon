import { Component, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  language = ''
  difficulty = ''
  private languageSubscription: Subscription;
  private difficultySubscription: Subscription;

  constructor(public dataService: DataService) {
    this.languageSubscription = this.dataService.language$.subscribe((value) => {
      this.language = value;
    });
    this.difficultySubscription = this.dataService.difficulty$.subscribe((value) => {
      this.difficulty = value;
    });
  }

  handleMenu($event: Event) {
    $event.preventDefault()
    this.dataService.toggleSidebar()
  }
  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
    this.difficultySubscription.unsubscribe();
  }
}
