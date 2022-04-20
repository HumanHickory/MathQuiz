import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FractionQuizComponent } from './Views/fraction-quiz/fraction-quiz.component';
import { HowToComponent } from './Views/how-to/how-to.component';
import { QuizComponent } from './Views/quiz/quiz.component';
import { ResultsComponent } from './Views/results/results.component';

const routes: Routes = [
  {path: '', component: ResultsComponent},
  {path: 'quiz/:type', component: QuizComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'fractionQuiz', component: FractionQuizComponent},
  {path: 'howTo/:type', component: HowToComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
