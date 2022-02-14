import { Component } from '@angular/core';
import { ExpressionsModel } from './Models/expressions';

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
  FormerAnswers: string = "";
  SelectedNumberString: string = "";

  title = 'MathQuiz';
}
