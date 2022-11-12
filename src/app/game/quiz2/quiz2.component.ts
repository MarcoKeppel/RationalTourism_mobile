import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-quiz2',
  templateUrl: './quiz2.component.html',
  styleUrls: ['./quiz2.component.scss'],
})
export class Quiz2Component implements AfterViewInit {

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

    this.backendService.getQuiz2().subscribe(
      data => {
        console.log("User registered");
        
        loading.dismiss();
        this.quiz = data;
      }
    );
  }

  btnAnswer(points: number) {

    this.backendService.sendQuiz2(points).subscribe(
      data => {
        console.log(data);
        this.router.navigate(["/", "game", "recap"],  { queryParams: { points: data.totalScore, type: "total" }});
      }
    );
  }
}

