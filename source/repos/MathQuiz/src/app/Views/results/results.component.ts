import { Parser } from '@angular/compiler/src/ml_parser/parser';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ExpressionsModel } from 'src/app/Models/expressions';
import { HighScoreModel } from 'src/app/Models/highScore';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  IncorrectCount!: number;
  CorrectCount!: number;
  IncorrectAnswers: ExpressionsModel[] = [];
  FormerAnswers: string[] = [];
  TotalCount: number = 0;
  SelectedNumberString: string = "";
  ResultsMessage: string = "";
  IsNewHighScore: boolean = false;
  HighScores: HighScoreModel[] = [];
  UserName: string = "Victoria";
  TypeOfMath: string = "";

  ShowResults: boolean = false;
  ShowDetails: boolean = false;

  constructor(private appComp: AppComponent) { }

  ngOnInit(): void {
    if (this.appComp.CorrectCount > 0 || this.appComp.IncorrectCount > 0) {
      this.CorrectCount = this.appComp.CorrectCount;
      this.IncorrectCount = this.appComp.IncorrectCount;
      this.IncorrectAnswers = this.appComp.IncorrectAnswers;
      this.FormerAnswers = this.appComp.FormerAnswers;
      this.TotalCount = this.appComp.TotalCount;
      this.ShowResults = true;
      this.SelectedNumberString = this.appComp.SelectedNumberString;
      this.TypeOfMath = this.appComp.TypeOfMath;
      

      if (this.IncorrectCount > 5) {
        this.ResultsMessage = "<div class='display-4 mb-5'>Let's Try Again!</div>";
      } else if (this.IncorrectCount > this.CorrectCount) {
        this.ResultsMessage = "<div class='display-4 mb-5'>Take a look at focus areas and try again!</div></div>";
      } else if (this.IncorrectCount == 0 && this.TotalCount > 20) {
        this.ResultsMessage = "<div class='display-4 mb-5 text-success'>You're A Math Wiz!</div>";
      } else if (this.TotalCount < 10) {
        this.ResultsMessage = "<div class='display-4 mb-5'>Next Time, Let's Work on Speed!</div>";
      } else {
        this.ResultsMessage = "<div class='display-4 mb-5 text-success'>Awesome Job! Let's Play Again.</div>";
      }

      this.LogHighScores();

    } else {
      this.ShowResults = false;
      this.GetHighScores();
    }
  }

  LogHighScores() {
    var score = this.appComp.Score * 10;  

    //Create Score 
    if(this.appComp.TypeOfMath == "fractions"){
      if(this.appComp.SelectedDifficulty == "Normal"){
        score =this.appComp.Score * 20;
      } else {
        score =this.appComp.Score * 25;
      }
    } else if(this.appComp.SelectedDifficulty == "Hard"){
      score = this.appComp.Score * 15;
    } else if (this.appComp.SelectedDifficulty == "PreAlgebra"){
      score = this.appComp.Score * 20;
    }
    

    if(score > this.appComp.HighScores[0].score) {
      this.ResultsMessage = "<div class='flashingText mb-4'>NEW HIGH SCORE!</div>"
    } else if(score > this.appComp.HighScores[4].score){
      this.ResultsMessage = "<div class='display-4 mb-5 text-success'>You Made the Leaderboard!</div>"
    }
 
    if (score > this.appComp.HighScores[4].score) {

      var highScore: HighScoreModel = {
        name: this.UserName,
        score: score,
        totalNumber: this.TotalCount,
        difficulty: this.appComp.SelectedDifficulty,
        type: this.appComp.TypeOfMath
      }
             
      this.appComp.HighScores.splice(4);
      this.appComp.HighScores.push(highScore);
      this.appComp.HighScores = this.appComp.HighScores.sort(function (a, b) { return b.score - a.score; });
      localStorage.setItem("mathQuizHighScores", JSON.stringify(this.appComp.HighScores));
    }

    this.HighScores = this.appComp.HighScores;
  }

  GetHighScores(){
    this.HighScores = this.appComp.HighScores;
  }
}
