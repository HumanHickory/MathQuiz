import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import {RadioButtonModule} from 'primeng/radiobutton';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './Views/quiz/quiz.component';
import { ResultsComponent } from './Views/results/results.component';
import { FractionQuizComponent } from './Views/fraction-quiz/fraction-quiz.component';
import { HowToComponent } from './Views/how-to/how-to.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ResultsComponent,
    FractionQuizComponent,
    HowToComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CheckboxModule,
    DialogModule,
    InputTextareaModule,
    ToastModule,
    RadioButtonModule,
    BrowserAnimationsModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
