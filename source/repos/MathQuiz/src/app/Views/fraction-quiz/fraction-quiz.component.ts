import { Component, OnInit } from '@angular/core';
import { ExpressionsModel } from 'src/app/Models/expressions';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-fraction-quiz',
  templateUrl: './fraction-quiz.component.html',
  styleUrls: ['./fraction-quiz.component.css']
})
export class FractionQuizComponent implements OnInit {

  TimerCount: number = 60;

  Numbers: number[] = [1, 4, 7, 10, 2, 5, 8, 11, 3, 6, 9, 12];
  SelectedNumbers!: number[];
  UserAnswer: string = "";
  UserAnswer2: string = "";
  UserAnswerMixedNumber: string = "";
  Correct: string = "";
  FormerAnswers: string[] = [];
  AttemptCount: number = 0;
  PlayTypeOptions: string[] = ["Find Equivalent", "Simplifying/Reducing"];
  PlayTypeSelected: string = "Find Equivalent";
  DifficultyOptions: string[] = ["Normal", "Hard"];
  DifficultySelected: string = "Normal";
  TypeOfMath: string = "Fractions";
  MathExpression: string = "";
  MathProblem: string = "";
  VariableNumerator!: number;
  Numerator!: number;
  Denominator!: number;
  MixedNumber!: number;
  VariableDenominator!: number; //used for Denom or Numer 2
  PreferencesSet = false;
  Score: number = 0;
  IsPractice: boolean = false;
  ShowAnswer: boolean = false;
  MixedNumbers: boolean = false;
  Step1: string = "";
  Step2: string = "";
  Step3: string = "";
  Step4: string = "";
  Step5: string = "";
  Step6: string = "";

  constructor(private router: Router, private appComp: AppComponent, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.PreferencesSet = false;


    this.appComp.TypeOfMath = this.TypeOfMath;
  }

  Initiate() {
    this.appComp.FormerAnswers = [];
    this.appComp.TotalCount = 0;
    this.appComp.SelectedDifficulty = this.PlayTypeSelected;
    this.CreateMathProblem();

    this.PreferencesSet = true;
    this.appComp.SelectedNumberString = "You practiced Fractions!";

    if (this.IsPractice) {
      this.IsPractice = true;
    } else {
      window.setInterval(() => this.WatchTimer(), 1000);
    }

  }

  WatchTimer() {
    this.TimerCount -= 1;
    if (this.TimerCount == 0) {
      this.appComp.FormerAnswers = this.FormerAnswers;
      this.appComp.Score = this.Score;
      this.router.navigate(['/results']);
    }
  }

  EndSession() {
    this.appComp.FormerAnswers = [];
    this.appComp.TotalCount = 0;
    this.appComp.CorrectCount = 0;
    this.appComp.IncorrectCount = 0;
    this.router.navigate(['/results']);
  }

  CreateMathProblem() {
    console.log("Difficulty: " + this.DifficultySelected + " PlayType: " + this.PlayTypeSelected)
    this.MathProblem = "";
    this.MixedNumbers = false;

    var multiplier = this.Numbers[Math.floor(Math.random() * (this.Numbers.length - 2)) + 2];

    //the numbers to reduce were out of control for an 8 year old. 
    if(this.PlayTypeSelected == this.PlayTypeOptions[1] && this.DifficultySelected == this.DifficultyOptions[1]){
      var multiplier = this.getRandomInt(2, 5);

    }

    if (this.PlayTypeSelected == this.PlayTypeOptions[0]) {

      this.Denominator = this.Numbers[Math.floor(Math.random() * this.Numbers.length)];
      
      //if easy, then top number will be lower than bottom. Otherwise, top and bottom can be anything
      if(this.DifficultySelected == this.DifficultyOptions[0]){
        if(this.Denominator == 1)
           this.Denominator = 2;
        this.Numerator = this.getRandomInt(1, this.Denominator);
      } else {
        this.Numerator = this.Numbers[Math.floor(Math.random() * this.Numbers.length)];
      }

      this.VariableDenominator = this.Denominator * multiplier; 
      this.VariableNumerator = this.Numerator * multiplier;

      this.MathProblem = this.Numerator + "/" + this.Denominator + " = ?/" + this.VariableDenominator;
      this.MathExpression = this.Numerator + "/" + this.Denominator + " = ?/" + this.VariableDenominator;

      console.log("Multiplier = " + multiplier + " Answer = " + this.VariableNumerator);
    } else if (this.PlayTypeSelected == this.PlayTypeOptions[1]) {
      this.VariableDenominator = this.getRandomInt(2, 13);
      this.VariableNumerator = this.getRandomInt(1, this.VariableDenominator);

      //check if answer can be further simplified. 
      this.Numbers.forEach(reductionChk =>{
        if(reductionChk > 1 && this.VariableDenominator % reductionChk == 0 && this.VariableNumerator % reductionChk == 0){
          this.VariableDenominator = this.VariableDenominator / reductionChk;
          this.VariableNumerator = this.VariableNumerator /reductionChk;   
          console.log("REDUCED! Answer = " + this.VariableNumerator + " / " + this.VariableDenominator);   
        }             
      });


      this.Denominator = this.VariableDenominator * multiplier;
      this.Numerator = this.VariableNumerator * multiplier;

      this.MathProblem = this.Numerator + "/" + this.Denominator + " = ";
      this.MathExpression = this.Numerator + "/" + this.Denominator + " = ";

      if(this.DifficultySelected == this.DifficultyOptions[1]){
        this.MixedNumbers = true;
        this.MixedNumber = this.getRandomInt(2, 3);
        this.Numerator += this.Denominator * this.MixedNumber;

        if(this.Numerator % this.Denominator)
        console.log("Answer = " + this.MixedNumber + " " + this.VariableNumerator + " / " + this.VariableDenominator);

      }

      this.MathProblem = this.Numerator + "/" + this.Denominator + " = ";
      this.MathExpression = this.MathProblem;

    } 

    //Practice
    if (this.IsPractice) {
      if (this.PlayTypeSelected == this.PlayTypeOptions[0]) {
        this.Step1 = "Find the multiplier for the denominators (the bottom numbers). What is " + this.VariableDenominator + " ÷ " + this.Denominator + "?";
        this.Step2 = "Next, multiply the known numerator (top number) by the multiplier you just found. What is " + this.Numerator + " times the number you found in step 1?";
        this.Step3 = "Thats the answer! Try it and lets see if you're right!";
        var product = this.VariableDenominator / this.Denominator;
        this.Step4 = "Remember " + this.VariableDenominator + " ÷ " + this.Denominator + " = " + product + ".";
        this.Step5 = "Now multiply the numerator by this number: " + this.Numerator + " x " + product + " = " + this.VariableNumerator;
        this.Step6 = "So the answer must be " + this.VariableNumerator;
      } else if (this.PlayTypeSelected == this.PlayTypeOptions[1] && this.DifficultySelected == this.DifficultyOptions[0]) {
        this.Step1 = "Find the number both the numerator (top) and denominator (bottom) can be divided by, except for 1. Keep in mind, there may be more than 1 answer. You want to find the highest number they can both be divided by.";
        this.Step2 = "Now, divide across. " + this.Numerator + " divided by the number you found goes in the blue box. " + this.Denominator + " divided by the number you found goes in the yellow box.";
        this.Step3 = "Thats the answer! Try it and lets see if you're right!";
        this.Step4 = "Both " + this.Numerator + " and " + this.Denominator + " can be divided by " + multiplier + " and equal a whole number.";
        this.Step5 = "Let's divide those now: " + this.Numerator + " ÷ " + multiplier + " = " + this.VariableNumerator + " and ";
        this.Step5 += this.Denominator + " ÷ " + multiplier + " = " + this.VariableDenominator + ".";
        this.Step6 = "So the answer must be " + this.VariableNumerator + " / " + this.VariableDenominator;
      }else if (this.PlayTypeSelected == this.PlayTypeOptions[1] && this.DifficultySelected == this.DifficultyOptions[1]) {
        this.Step1 = "First, subtract the demoninator from the numerator as many times as you can. How many times can you subtract " + this.Denominator + " from " + this.Numerator + " while still being above 0?";
        this.Step2 = "Place that number in the large dark blue box. This is your whole number.";
        this.Step3 = "Whatever number is left over after subtracting the denominator from the numerator as many times as you can is your new numerator. Simplify if you can!";
        
        this.Step4 = this.Denominator + " can be subtracted from " + this.Numerator + " " + this.MixedNumber + " times. " 
        var newNumerator =  this.Numerator - (this.Denominator * this.MixedNumber);
        this.Step4 +="Now Find your remaining fraction by doing the math: " + this.Numerator + " - (" + this.Denominator + " x " + this.MixedNumber + ") = " + newNumerator + ".";
        this.Step5 = "Your whole number is " + this.MixedNumber + " and your new fraction is " + newNumerator + " / " + this.Denominator + ".";
        this.Step5 += "Now simplify this fraction. The result is: " + this.VariableNumerator + " / " + this.VariableDenominator;
        this.Step6 = "So the answer must be " + this.MixedNumber + " " + this.VariableNumerator + " / " + this.VariableDenominator;
      }
    }

    if(this.MixedNumbers){
      document.getElementById("UserAnswerMixedNumber")?.focus();

    } else {
    document.getElementById("userAnswer")?.focus();
    }
  }

  CheckAnswer() {

    var isCorrect = false;

    if (this.PlayTypeSelected == this.PlayTypeOptions[0] && parseInt(this.UserAnswer) == this.VariableNumerator) {
      isCorrect = true;
    } else if (this.PlayTypeSelected == this.PlayTypeOptions[1] &&
      this.DifficultySelected == this.DifficultyOptions[0] &&
      parseInt(this.UserAnswer) == this.VariableNumerator &&
      parseInt(this.UserAnswer2) == this.VariableDenominator) {
      isCorrect = true;
    }else if (this.PlayTypeSelected == this.PlayTypeOptions[1] &&
      this.DifficultySelected == this.DifficultyOptions[1] &&
      parseInt(this.UserAnswer) == this.VariableNumerator &&
      parseInt(this.UserAnswer2) == this.VariableDenominator &&
      parseInt(this.UserAnswerMixedNumber) == this.MixedNumber ) {
      isCorrect = true;
    }


    if (isCorrect) {
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
      this.UserAnswer2 = "";
      this.UserAnswer2 = "";
      this.UserAnswerMixedNumber = "";
      this.CreateMathProblem();
      this.AttemptCount = 0;
      this.appComp.TotalCount += 1;
      this.ShowAnswer = false;

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

  CalculateScore(isCorrect: boolean) {
    var easyNumbers = [1, 2, 3, 4, 5, 10, 11];
     if(isCorrect){
        this.Score += 10;

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
        answer: this.VariableNumerator,
        expression: this.MathExpression
      }

      this.appComp.IncorrectCount += 1;
      this.appComp.IncorrectAnswers.push(incorrectAnswer);
    }

    this.CreateFormerAnswers("text-danger");

    this.UserAnswer = "";
    this.UserAnswer2 = "";
    this.UserAnswerMixedNumber = "";
  }

  CreateFormerAnswers(textColor: string) {
    if (this.PlayTypeSelected == this.PlayTypeOptions[0]) {
      var splitString = this.MathProblem.split("?");
      this.FormerAnswers.push("<span class='" + textColor + "'>" + splitString[0] + this.UserAnswer + splitString[1] + "</span><br>");
    } else if (this.PlayTypeSelected == this.PlayTypeOptions[1]) {
      this.FormerAnswers.push("<span class='" + textColor + "'>" + this.MathExpression + this.UserAnswer + "/" + this.UserAnswer2 + "</span><br>");
    }
  }



  eventHandler(keyCode: any) {
    if (keyCode == 13) {
      this.CheckAnswer();
    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


}

