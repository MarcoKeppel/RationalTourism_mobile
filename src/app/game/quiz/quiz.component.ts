import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements AfterViewInit {

  public quiz;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private backendService: BackendService,
  ) { }

  ngAfterViewInit() {

    this.loadQuiz();
  }

  async loadQuiz() {

    const loading = await this.loadingCtrl.create({
    });

    loading.present();

    this.backendService.getQuiz().subscribe(
      data => {
        console.log("User registered");
        
        loading.dismiss();
        this.quiz = data;
      }
    );
  }

  btnAnswer(points: number) {

    this.backendService.sendQuiz(points).subscribe(
      data => {
        console.log(data);
        this.router.navigate(["/", "game", "recap"],  { queryParams: { points: data.totalScore, type: "partial2" }});
      }
    );
  }
}
