import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.page.html',
  styleUrls: ['./hello.page.scss'],
})
export class HelloPage implements OnInit {

  username: string;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private backendService: BackendService,
  ) { }

  ngOnInit() {
  }

  async btnPlay() {

    const loading = await this.loadingCtrl.create({
    });

    loading.present();

    this.backendService.registerUser(this.username).subscribe(
      data => {
        console.log("User registered");
        
        loading.dismiss();
        this.router.navigate(["/", "game"]);
      }
    );
  }

}
