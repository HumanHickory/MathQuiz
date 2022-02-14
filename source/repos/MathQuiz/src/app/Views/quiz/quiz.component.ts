import { Parser } from '@angular/compiler/src/ml_parser/parser';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ExpressionsModel } from 'src/app/Models/expressions';
import { MultiplicationComponent } from '../multiplication/multiplication.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  IncorrectCount!: number;
  CorrectCount!: number;
  IncorrectAnswers: ExpressionsModel[] = [];
  FormerAnswers: string = "";
  TotalCount: number = 0;
  SelectedNumberString: string = "";

  ShowResults: boolean = false;
  ShowDetails: boolean = false;

  constructor(private appComp: AppComponent) { }

  ngOnInit(): void {
    if (this.appComp.CorrectCount > 0 || this.appComp.IncorrectCount > 0) {
      this.CorrectCount = this.appComp.CorrectCount;
      this.IncorrectCount= this.appComp.IncorrectCount;
      this.IncorrectAnswers = this.appComp.IncorrectAnswers;
      this.FormerAnswers = this.appComp.FormerAnswers;
      this.TotalCount = this.appComp.TotalCount;
      this.ShowResults = true;
      this.SelectedNumberString = this.appComp.SelectedNumberString;

    } else {
      this.ShowResults = false;
    }
  }





}
