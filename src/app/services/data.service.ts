import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

type Language = 'MANDARIN' | "KOREAN" | "JAPANESE"
type MandarinDifficulty = 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5'
type JapaneseDifficulty = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
type KoreanDifficulty = 'TOPIK 1' | 'TOPIK 2' | 'TOPIK 3'
type Difficulty = MandarinDifficulty | JapaneseDifficulty | KoreanDifficulty

// type LanguageToDifficultyMap = {
//   MANDARIN: MandarinDifficulty;
//   JAPANESE: JapaneseDifficulty;
//   KOREAN: KoreanDifficulty;
// };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  language: Language = 'MANDARIN'
  difficulty: Difficulty = 'HSK1'


  difficulties: Record<Language, Difficulty[]> = {
    MANDARIN: ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5'],
    JAPANESE: ['N5', 'N4', 'N3', 'N2', 'N1'],
    KOREAN: ['TOPIK 1', 'TOPIK 2', 'TOPIK 3']
  };

  mandarinDifficultyArr: MandarinDifficulty[] = ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5']
  japaneseDifficultyArr: JapaneseDifficulty[] = ['N5', 'N4', 'N3', 'N2', 'N1']
  koreanDifficultyArr: KoreanDifficulty[] = ['TOPIK 1', 'TOPIK 2', 'TOPIK 3']

  setLanguage(languageSelection: Language) {
    this.language = languageSelection
  }
  setDifficulty(difficultySelection: Difficulty) {
    this.difficulty = difficultySelection
  }
  selectLanguage(languageSelection: Language) {
    this.setLanguage(languageSelection);
    const difficultyArr = this.getDifficulties(languageSelection);
    difficultyArr && this.setDifficulty(difficultyArr[0]);
  }
  getDifficulties(languageSelection: Language): Difficulty[] | null {
    return this.difficulties[languageSelection] || null;
  }

  selectDifficulty(difficultySelection: Difficulty) {
    const languageDifficultyArr = this.difficulties[this.language];
    if (languageDifficultyArr && languageDifficultyArr.includes(difficultySelection)) {
      this.setDifficulty(difficultySelection);
    } else {
      // Handle error: Invalid difficulty for the selected language
      console.error('Invalid difficulty for the selected language');
    }
  }

  API_URL = `https://nextapi-programmersteve.vercel.app/api/anthropic`
  question = "我___三年级"
  choices = ['是', '二', '没关系', '什么']
  answer = '是'
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
  constructor(private http: HttpClient) { }

  private attemptSubject = new BehaviorSubject<number>(0);
  private correctSubject = new BehaviorSubject<number>(0);
  private isSubmittedSubject = new BehaviorSubject<boolean>(false);
  public attempts$ = this.attemptSubject.asObservable();
  public correct$ = this.correctSubject.asObservable();
  public isSubmitted$ = this.isSubmittedSubject.asObservable();
  public attempts = 0
  public correct = 0
  public isSubmitted = false
  getAttempts() {
    return this.attemptSubject.value;
  }
  getCorrect() {
    return this.correctSubject.value;
  }
  getIsSubmitted() {
    return this.isSubmittedSubject.value
  }
  setAttempts(newValue: number): void {
    this.attemptSubject.next(newValue);
  }
  setCorrect(newValue: number): void {
    this.correctSubject.next(newValue);
  }
  setIsSubmitted(newValue: boolean): void {
    this.isSubmittedSubject.next(newValue)
  }






  resetScore() {
    this.setCorrect(0)
    this.setAttempts(0)
  }
  toggleSubmission(selected: string, correctAnswer: string) {
    if ((selected !== '' || correctAnswer !== '') && selected === correctAnswer) {
      this.setCorrect(this.getCorrect() + 1)
    }
    this.setAttempts(this.getAttempts() + 1)
    this.setIsSubmitted(true)
  }



  sidebarVisible = false
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible
  }

  getData(prompt: string): Observable<any> {
    return this.http.get(this.API_URL);
  }


}
