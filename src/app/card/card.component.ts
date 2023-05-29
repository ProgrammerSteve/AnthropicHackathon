import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  question = ""
  choices = ['', '', '', '']
  answer = ''
  prompt = ``
  constructor(public dataService: DataService) {
    this.getQuestion()
  }
  getQuestion() {
    console.log("NEW QUESTION")
    this.dataService.getData(this.prompt).subscribe({
      next: (value) => {
        this.question = value?.question?.sentence || ''
        this.answer = value?.question?.answer || ''
        this.choices = [
          value?.question?.choices.a || '',
          value?.question?.choices.b || '',
          value?.question?.choices.c || '',
          value?.question?.choices.d || '',
        ]
        console.log(value)
      },
      error: (e) => console.log(e)
    }
    );
  }
  ngOnInit(): void {
    // this.getQuestion()
  }
}


/*
The language and difficulty can be found in the dataService object,
so that it can be selected in the side bar. For now we will focus on Mandarin and HSK1 difficulty
The prompt is what get fed into the claude api
*/
