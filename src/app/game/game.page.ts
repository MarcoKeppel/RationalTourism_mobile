import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit() {
  }

  btnCloseSession() {

    this.backendService.endSession().subscribe();
  }
}
