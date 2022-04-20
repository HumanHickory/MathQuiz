import { Component } from '@angular/core';
import { ExpressionsModel } from './Models/expressions';
import { HighScoreModel } from './Models/highScore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  IncorrectCount: number = 0;
  CorrectCount: number = 0;
  IncorrectAnswers: ExpressionsModel[] = [];
  TotalCount: number = 0;
  FormerAnswers: string[] = [];
  SelectedNumberString: string = "";
  HighScores: HighScoreModel[] = [];
  title = 'MathQuiz';
  SelectedDifficulty: string = "";
  Score:number = 0;
  UserName:string = "Victoria";
  TypeOfMath: string = "";



  ngOnInit(): void {
    let HighScores: any = localStorage.getItem("mathQuizHighScores") == null ? "" : localStorage.getItem("mathQuizHighScores");

    if (HighScores != "") {
      this.HighScores = JSON.parse(HighScores);
    } else {
      var highScore: HighScoreModel = {
        name: "-",
        score: 0,
        totalNumber: 0,
        difficulty: "Normal",
        type: "-"
      }

      //add 5 blank high
      this.HighScores.push(highScore);
      this.HighScores.push(highScore);
      this.HighScores.push(highScore);
      this.HighScores.push(highScore);
      this.HighScores.push(highScore);

      localStorage.setItem("mathQuizHighScores", JSON.stringify(this.HighScores));
    }
  }
}
