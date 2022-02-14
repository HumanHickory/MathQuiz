import { Component, OnInit } from '@angular/core';
import { ExpressionsModel } from 'src/app/Models/expressions';
import { Router } from '@angular/router';
import { QuizComponent } from '../quiz/quiz.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-multiplication',
  templateUrl: './multiplication.component.html',
  styleUrls: ['./multiplication.component.css']
})
export class MultiplicationComponent implements OnInit {
  Numbers: number[] = [1, 4, 7, 10, 2, 5, 8, 11, 3, 6, 9, 12];
  SelectedNumbers!: number[];
  UserAnswer: string = "";
  NumOfConstants: number = 2;
  Correct: string = "";
  FormerAnswers: string = "";
  AttemptCount: number = 0;


  MathProblem: string = "";
  Answer!: number;
  TimerCount: number = 10;

  PreferencesSet = false;

  constructor(private router: Router, private appComp: AppComponent) { }

  ngOnInit(): void {
    let UserPreferencesStr: any = localStorage.getItem("mathQuizSelectedNumbers") == null ? "" : localStorage.getItem("mathQuizSelectedNumbers");
    if (UserPreferencesStr != "") {
      this.SelectedNumbers = JSON.parse(UserPreferencesStr);
    } else {
      this.SelectedNumbers = this.Numbers;
    }
  }

  Initiate() {
    this.CreateMathProblem();
    localStorage.setItem("mathQuizSelectedNumbers", JSON.stringify(this.SelectedNumbers));

    this.appComp.SelectedNumberString = "You practiced multiples of ";

    this.SelectedNumbers = this.SelectedNumbers.sort(function (a, b) {  return a - b;  });

    this.SelectedNumbers.forEach(number =>{
      if(this.SelectedNumbers.indexOf(number) != this.SelectedNumbers.length - 1){
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
      this.router.navigate(['']);
    }
  }

  CreateMathProblem() {
    this.MathProblem = "";
    var numbers = [];
    var answer = 0;

    for (var i = 0; i != this.NumOfConstants; i++) {
      var num = this.SelectedNumbers[Math.floor(Math.random() * this.SelectedNumbers.length)];
      numbers.push(num);

      if (i != this.NumOfConstants - 1) {
        this.MathProblem += num + " x ";
      } else {
        this.MathProblem += num;
      }
    }

    for (var i = 1; i < numbers.length; i++) {
      if (i == 1) {
        answer = numbers[0] * numbers[i];
      } else {
        answer = answer * numbers[i];
      }
    }

    this.MathProblem = this.MathProblem + " = ";
    this.Answer = answer;
  }

  CheckAnswer() {
    if (parseInt(this.UserAnswer) == this.Answer) {
      var textColor = "";
      if (this.AttemptCount == 0) {
        this.appComp.CorrectCount += 1;
        textColor = "text-success";
      } else {
        textColor = "text-dark";
      }
      this.FormerAnswers += "<span class='" + textColor + "'>" + this.MathProblem + this.UserAnswer + "</span><br>";
      this.UserAnswer = "";
      this.CreateMathProblem();
      this.AttemptCount = 0;
      this.appComp.TotalCount += 1;

    } else if (this.Correct != "textDanger") {
      this.Correct = "textDanger";
      this.LogIncorrectAnswers();
      this.AttemptCount += 1;
    } else {
      this.Correct = "textDangerReanimate";
      this.LogIncorrectAnswers();
      this.AttemptCount += 1;
    }

  }

  LogIncorrectAnswers() {
    if (this.AttemptCount == 0) {
      var incorrectAnswer: ExpressionsModel = {
        answer: this.Answer,
        expression: this.MathProblem.substring(0, this.MathProblem.length - 3)
      }

      this.appComp.IncorrectCount += 1;

      this.appComp.IncorrectAnswers.push(incorrectAnswer);
    }

    this.FormerAnswers += "<span class='text-danger'>" + this.MathProblem + this.UserAnswer + "</span><br>";
    this.UserAnswer = "";
  }



  eventHandler(keyCode: any) {
    if (keyCode == 13) {
      this.CheckAnswer();
    }
  }



}
