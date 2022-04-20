import { Component, OnInit } from '@angular/core';
import { ExpressionsModel } from 'src/app/Models/expressions';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  TimerCount: number = 60;

  Numbers: number[] = [1, 4, 7, 10, 2, 5, 8, 11, 3, 6, 9, 12];
  SelectedNumbers!: number[];
  UserAnswer: string = "";
  Correct: string = "";
  FormerAnswers: string[] = [];
  AttemptCount: number = 0;
  DifficultyOptions: string[] = ["Normal", "Hard", "PreAlgebra"];
  SelectedDifficulty: string = "Normal";
  TypeOfMath: string = "Division";
  AlgebraicLetters: string[] = ["a", "b", "c", "n", "m", "r", "y", "x", "z"];
  SelectedAlgebraicLetters: string = "a";
  MathExpression: string = "";
  MathProblem: string = "";
  Answer!: number;
  Number1!: number;
  Number2!: number;
  PreferencesSet = false;
  Score: number = 0;

  constructor(private router: Router, private appComp: AppComponent, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    var type = this.activatedRoute.snapshot.paramMap.get("type");
    this.PreferencesSet = false;

    if(type != null){
      this.TypeOfMath = type;
      this.appComp.TypeOfMath = type;
      console.log(this.appComp.TypeOfMath);
    }

    let UserPreferencesStr: any = localStorage.getItem("mathQuizSelectedNumbers") == null ? "" : localStorage.getItem("mathQuizSelectedNumbers");
    
    if (UserPreferencesStr != "") {
      this.SelectedNumbers = JSON.parse(UserPreferencesStr);
    } else {
      this.SelectedNumbers = this.Numbers;
    }
  }

  Initiate() {
    this.appComp.FormerAnswers = [];
    this.appComp.TotalCount = 0;
    this.appComp.SelectedDifficulty = this.SelectedDifficulty;
    this.CreateMathProblem();
    localStorage.setItem("mathQuizSelectedNumbers", JSON.stringify(this.SelectedNumbers));

    this.appComp.SelectedNumberString = "You practiced multiples of ";

    this.SelectedNumbers = this.SelectedNumbers.sort(function (a, b) { return a - b; });

    this.SelectedNumbers.forEach(number => {
      if (this.SelectedNumbers.indexOf(number) != this.SelectedNumbers.length - 1) {
        this.appComp.SelectedNumberString += number + ", ";
      } else {
        this.appComp.SelectedNumberString += number + "!";
      }
    });

    this.PreferencesSet = true;
    window.setInterval(() => this.WatchTimer(), 1000);
  }

  WatchTimer() {
    this.TimerCount -= 1;
    if (this.TimerCount == 0) {
      this.appComp.FormerAnswers = this.FormerAnswers;
      this.appComp.Score = this.Score;
      this.router.navigate(['/results']);
    }
  }

  CreateMathProblem() {
    this.MathProblem = "";
    var answer = 0;
    var symbol = "";


    if (this.TypeOfMath == "Multiplication") {
      this.Number1 = this.SelectedNumbers[Math.floor(Math.random() * this.SelectedNumbers.length)];
      this.Number2 = this.Numbers[Math.floor(Math.random() * this.Numbers.length)];

      var answer = this.Number1 * this.Number2;
      
      var symbol = this.SelectedDifficulty == "PreAlgebra" ? " ⋅ " : " x ";

    } else if (this.TypeOfMath == "Division") {
      this.Number2 = this.SelectedNumbers[Math.floor(Math.random() * this.SelectedNumbers.length)];
      answer = this.Numbers[Math.floor(Math.random() * this.Numbers.length)];

      this.Number1 = this.Number2 * answer;
      var symbol = " ÷ "

    }

    if (this.SelectedDifficulty == "Normal") {
      this.MathProblem = this.Number1 + symbol + this.Number2;
      this.MathExpression = this.Number1 + symbol + this.Number2;
      this.Answer = answer;
    } else if (this.SelectedDifficulty == "Hard") {
      var evenOrOdd = Math.floor(Math.random() * 2);

      if (evenOrOdd == 0) {
        this.MathProblem = "___" + symbol + this.Number2 + " = " + answer;
        this.MathExpression = "?" + symbol + this.Number2 + " = " + answer;
        this.Answer = this.Number1;
      } else if (evenOrOdd == 1) {
        this.MathProblem = this.Number1 + symbol + "___ = " + answer;
        this.MathExpression = this.Number1 + symbol + "? = " + answer;

        this.Answer = this.Number2;
      }
    } else if (this.SelectedDifficulty == "PreAlgebra") {
      this.SelectedAlgebraicLetters = this.AlgebraicLetters[Math.floor(Math.random() * this.AlgebraicLetters.length)];
      var randomFormat = 0;
      if (this.TypeOfMath == "Multiplication") {
        var randomFormat = Math.floor(Math.random() * 3);
      } else {
        var randomFormat = Math.floor(Math.random() * 2);
      }

      if (randomFormat == 0) {
        this.MathProblem = this.SelectedAlgebraicLetters + symbol + this.Number2 + " = " + answer;
        this.MathExpression = this.SelectedAlgebraicLetters + symbol + this.Number2 + " = " + answer;
        this.Answer = this.Number1;
      } else if (randomFormat == 1) {
        this.MathProblem = this.Number1 + symbol + this.SelectedAlgebraicLetters + " = " + answer;
        this.MathExpression = this.Number1 + symbol + this.SelectedAlgebraicLetters + " = " + answer;
        this.Answer = this.Number2;
      }else if (randomFormat == 2) {
        this.MathProblem = this.Number1 + this.SelectedAlgebraicLetters + " = " + answer;
        this.MathExpression = this.Number1 + symbol + this.SelectedAlgebraicLetters + " = " + answer;
        this.Answer = this.Number2;
      }
    }
  }

  CheckAnswer() {
    if (parseInt(this.UserAnswer) == this.Answer) {
      this.Correct = "text-dark";
      var textColor = "";
      if (this.AttemptCount == 0) {
        this.appComp.CorrectCount += 1;
        textColor = "text-success";
      } else {
        textColor = "text-dark";
      }

      this.CalculateScore(true);
      this.CreateFormerAnswers(textColor);

      this.UserAnswer = "";
      this.CreateMathProblem();
      this.AttemptCount = 0;
      this.appComp.TotalCount += 1;

    } else if (this.Correct != "textDanger") {
      this.Correct = "textDanger";
      this.LogIncorrectAnswers();
      this.AttemptCount += 1;
      this.CalculateScore(false);

    } else {
      this.Correct = "textDangerReanimate";
      this.LogIncorrectAnswers();
      this.AttemptCount += 1;
      this.CalculateScore(false);
    }
  }

  CalculateScore(isCorrect: boolean){
    var easyNumbers = [1, 2, 3, 4, 5, 10, 11];
    if(isCorrect){
      if(easyNumbers.includes(this.Number1) || easyNumbers.includes(this.Number2)){
          this.Score += 5;
      } else {
          this.Score += 8;
      }

      if(this.AttemptCount == 0)
        this.Score += 2;
    } else {
      this.Score -= 1;
    }

    console.log(this.Score);
  }

  LogIncorrectAnswers() {
    if (this.AttemptCount == 0) {
      var incorrectAnswer: ExpressionsModel = {
        answer: this.Answer,
        expression: this.MathExpression
      }

      this.appComp.IncorrectCount += 1;
      this.appComp.IncorrectAnswers.push(incorrectAnswer);
    }

    this.CreateFormerAnswers("text-danger");

    this.UserAnswer = ""; 
  }

  CreateFormerAnswers(textColor: string) {
    if (this.SelectedDifficulty == "Normal") {
      this.FormerAnswers.push("<span class='" + textColor + "'>" + this.MathProblem + " = " + this.UserAnswer + "</span><br>");
    } else {
      var splitExpression:string[] = [];
      if (this.SelectedDifficulty == "Hard"){
        splitExpression = this.MathExpression.split("?");
      } else if (this.SelectedDifficulty == "PreAlgebra") {
        splitExpression = this.MathExpression.split(this.SelectedAlgebraicLetters);
      }

      if (splitExpression[0] == "") {
        this.FormerAnswers.push( "<span class='" + textColor + "'>" + this.UserAnswer + splitExpression[1] + "</span><br>");
      } else {
        this.FormerAnswers.push("<span class='" + textColor + "'>" + splitExpression[0] + this.UserAnswer + splitExpression[1] + "</span><br>");
      }
    }
  }



  eventHandler(keyCode: any) {
    if (keyCode == 13) {
      this.CheckAnswer();
    }
  }

}
