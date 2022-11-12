import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamePage } from './game.page';
import { MapComponent } from './map/map.component';
import { QuizComponent } from './quiz/quiz.component';
import { Quiz2Component } from './quiz2/quiz2.component';
import { RecapComponent } from './recap/recap.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MapComponent,
      },
      {
        path: 'recap',
        component: RecapComponent
      },
      {
        path: 'quiz',
        component: QuizComponent
      },
      {
        path: 'quiz2',
        component: Quiz2Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamePageRoutingModule {}
