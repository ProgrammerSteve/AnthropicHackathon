import { Component, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import type { Difficulty } from '../services/data.service';
import { Subscription } from 'rxjs'

// I'm leaving faCoffee as an example. You import the icon
// you want and make a variable for it
// Then you call the variable in html using this: <fa-icon [icon]="faCoffee"></fa-icon>


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {

  //This is the coffee icon variable
  faXmark = faXmark
  language = ''
  difficulty = ''
  private languageSubscription: Subscription;
  private difficultySubscription: Subscription;

  constructor(public data: DataService) {
    this.languageSubscription = this.data.language$.subscribe((value) => {
      this.language = value;
    });
    this.difficultySubscription = this.data.difficulty$.subscribe((value) => {
      this.difficulty = value;
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
    this.difficultySubscription.unsubscribe();
  }

  mandarinDifficulties = this.data.mandarinDifficultyArr
  japaneseDifficulties = this.data.japaneseDifficultyArr
  koreanDifficulties = this.data.koreanDifficultyArr
  spanishDifficulties = this.data.spanishDifficultyArr


  handleMandarin() {
    this.data.selectLanguage("MANDARIN")
  }
  handleJapanese() {
    this.data.selectLanguage("JAPANESE")
  }
  handleKorean() {
    this.data.selectLanguage("KOREAN")
  }
  handleSpanish() {
    this.data.selectLanguage("SPANISH")
  }

  handleDifficulty(difficulty: Difficulty) {
    this.data.selectDifficulty(difficulty)
  }

  closeSidebar($event: Event) {
    $event.preventDefault()
    this.data.toggleSidebar()
  }
}
