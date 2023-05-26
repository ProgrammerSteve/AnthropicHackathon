import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  constructor(public dataService: DataService) { }
  question = "我___三年级"
  correct = 0
  attempts = 0
  choices = ['是', '二', '没关系', '什么']
  answer = '是'
  selected = ''

  prompt = `
  Using HSK1 vocabulary in Mandarin, return a fill in the blank sentence in simplified Chinese characters. The location of the missing word will be replaced with 3 underscores, "___". The response should be in json format similiar to the example below:
  {
    question:{
      sentence:"我___三年级",
      choices:{
        a:"是",
        b:"二",
        c:"没关系",
        d:"什么",
      },
      answer:"是"
    }
  }
  Create your own original sentence based on these details, answer can either be "a","b","c", or "d". Return a JSON object. Only return one object.
  `
}


/*
We will use the claude api to generate and...
  - fill in the question
  - fill in the choices
  - fill in the answer


The language and difficulty can be found in the dataService object,
so that it can be selected in the side bar. For now we will focus on Mandarin and HSK1 difficulty

The prompt is what get fed into the claude api


We also need to make the selected choice highlighted using *ngStyle

We need to import the font awesome module and add icons to make things look neat
*/
