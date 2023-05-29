import { Component, Input, OnDestroy, Output, EventEmitter, } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss']
})
export class ChoicesComponent implements OnDestroy {
  private isSubmittedSubscription: Subscription;
  public isSubmitted = false
  constructor(public dataService: DataService) {
    this.isSubmittedSubscription = this.dataService.isSubmitted$.subscribe((value) => {
      this.isSubmitted = value;
    });
  }
  ngOnDestroy(): void {
    this.isSubmittedSubscription.unsubscribe();
  }
  @Input() choices: string[] = ['', '', '', '']
  @Input() answer = ''
  @Output() newQuestion = new EventEmitter<void>()
  selection = ''
  choiceSelected($event: string) {
    // console.log("choice clicked")
    // console.log($event)
    this.selection = $event
  }
  handleContinue() {
    this.dataService.setIsSubmitted(false)
    this.selection = ''
    this.newQuestion.emit()
  }
  handleSubmit() {
    this.dataService.toggleSubmission(this.selection, this.answer)
  }
  handleReset() {
    this.dataService.setIsSubmitted(false)
    this.dataService.resetScore()
    this.newQuestion.emit()
    this.selection = ''
  }
}
