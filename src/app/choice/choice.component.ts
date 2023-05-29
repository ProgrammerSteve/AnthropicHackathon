import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from "rxjs"
@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnChanges {
  checkMark = faCheck
  xMark = faX

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

  @Input() answer = ''
  @Input() choice = ''
  @Input() index = 0
  @Input() selection = ""
  @Output() choiceSelected = new EventEmitter<string>()

  handleClick() {
    !this.isSubmitted &&
      this.choiceSelected.emit(this.choice)
  }

  indexToLetter(index: number) {
    switch (index) {
      case 0:
        return "A"
      case 1:
        return "B"
      case 2:
        return "C"
      case 3:
        return "D"
      default:
        return "null"
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("index:", this.index)
    // console.log("answer:", this.answer)
    // console.log("choice:", this.choice)
  }

}
