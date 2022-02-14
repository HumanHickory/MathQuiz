import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultiplicationComponent } from './Views/multiplication/multiplication.component';
import { QuizComponent } from './Views/quiz/quiz.component';
import { SettingsComponent } from './Views/settings/settings.component';

const routes: Routes = [
  {path: '', component: QuizComponent},
  {path: 'mult', component: MultiplicationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
