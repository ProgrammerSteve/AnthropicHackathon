import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss']
})
export class ChoicesComponent {
  @Input() choices: string[] = ['', '', '', '']

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
  handleSubmit($event: Event) {
    console.log("submit clicked")
  }
  handleReset($event: Event) {
    console.log("reset clicked")
  }
}
