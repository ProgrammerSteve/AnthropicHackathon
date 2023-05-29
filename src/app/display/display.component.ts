import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnDestroy {
  private attemptSubscription: Subscription;
  private correctSubscription: Subscription;
  attempts = 0
  correct = 0
  constructor(public dataService: DataService) {
    this.attemptSubscription = this.dataService.attempts$.subscribe((value) => {
      this.attempts = value;
    });
    this.correctSubscription = this.dataService.correct$.subscribe((value) => {
      this.correct = value;
    });
  }
  @Input() question = ""

  ngOnDestroy(): void {
    this.attemptSubscription.unsubscribe();
    this.correctSubscription.unsubscribe();
  }


}
